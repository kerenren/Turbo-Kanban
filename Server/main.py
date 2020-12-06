#!/bin/python3

import os
import logging
from flask_cors import CORS
from flask import Flask, json, abort, request
from data_layer.MySqlDb import MySqlDb
from data_layer.data_layer import get_dir_info_by_path, validate_dir


PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))
FILE_UPLOAD_FOLDER = os.path.join(PROJECT_HOME, "uploads", "Files")
MODULE_UPLOAD_FOLDER = os.path.join(PROJECT_HOME, "uploads", "Modules")
DB_TABLE_WHITE_LIST = ['BOT_VIEW']


logger = logging.getLogger("kanban")


class TurboKanbanApp(Flask):
    def __init__(self, import_name):
        super(TurboKanbanApp, self).__init__(import_name)
        self.cors = CORS(self)
        self.db = MySqlDb()
        self.command_dict = {
            "delete_module": self.delete_module,
            "stop_module": self.stop_module,
            "update_config": self.update_config,
            "add_command": self.add_command
        }
        self.add_url_rule('/dir-data', view_func=self.get_dir_info_by_type, methods=["GET"])
        self.add_url_rule('/db_data', view_func=self.get_data_by_table_name, methods=["GET"])
        self.add_url_rule('/logs/<uid>', view_func=self.get_logs_by_bot, methods=["GET"])
        self.add_url_rule('/execute_command', view_func=self.execute_command_by_type, methods=['POST'])
        self.add_url_rule('/uploading/<content_type>', view_func=self.upload_files, methods=['POST'])

    def get_dir_info_by_type(self):
        type = request.args.get('type')

        if type == 'file':
            files_info = get_dir_info_by_path(FILE_UPLOAD_FOLDER)
            return self.response_class(response=json.dumps({'status': "success", 'files_info': files_info}),
                                      status=200,
                                      mimetype="application/json")
        if type == 'module':
            modules_info = get_dir_info_by_path(MODULE_UPLOAD_FOLDER)
            return self.response_class(response=json.dumps({'status': "success", 'files_info': modules_info}),
                                       status=200,
                                       mimetype="application/json")
        else:
            return self.response_class(
                response=json.dumps({'status': "wrong data type. It should be either a module or a file"}),
                status=403,
                mimetype="application/json")

    def get_data_by_table_name(self):
        try:
            table_name = request.args.get('table_name')

            if not table_name or table_name not in DB_TABLE_WHITE_LIST:
                abort(404, description='the table name is missing or it\\`s not found in db')

            if table_name in DB_TABLE_WHITE_LIST:
                if table_name == 'BOT_VIEW':
                    data = self.db.get_bot_view()
                    return self.response_class(response=json.dumps(data),
                                               status=200,
                                               mimetype='application/json')
        except Exception as e:
            logger.exception(f'Error from get_data_by_table_name: {e}')
            return self.response_class(
                response=json.dumps({'status': "Unable to retrieve the data from db. Please check with the admin"}),
                status=404,
                mimetype="application/json")

    def get_logs_by_bot(self, uid):
        try:
            logs = self.db.get_logs_by_bot(uid)

            if not logs:
                return self.response_class(response=json.dumps({'logs': f'missing logs raw data in db for bot {uid}'}),
                                          status=404,
                                          mimetype='application/json')
            return self.response_class(response=json.dumps({'logs': logs}),
                                      status=200,
                                      mimetype='application/json')
        except Exception as e:
            logger.exception(f'Error from get_logs_by_bot: {e}')
            return self.response_class(response=json.dumps({'error': f"{e}"}),
                                      status=403,
                                      mimetype='application/json')

    def upload_module_or_file(self, cmd_value, uid, cmd_type):
        fileToDownload = cmd_value['fileToDownload']
        remote_file_name = cmd_value['remoteFileName']
        self.db.upload_file_or_module(uid, cmd_type, fileToDownload, remote_file_name)

    def delete_module(self, cmd_value, uid):
        remote_file_name = cmd_value['remoteFileName']
        self.db.add_delete_module_to_db(uid, remote_file_name)

    def stop_module(self, cmd_value, uid):
        cmd_title = cmd_value['commandTitle']
        self.db.add_stop_module_to_db(uid, cmd_title)

    def update_config(self, cmd_value, uid):
        kargs = cmd_value['kargs']
        self.db.add_update_config_to_db(uid, kargs)

    def add_command(self, cmd_value, uid):
        cmd_title = cmd_value['commandTitle']
        remote_file_name = cmd_value['remoteFileName']
        kargs = cmd_value['kargs']
        self.db.add_command(uid, cmd_title, remote_file_name, kargs)

    def execute_command_by_type(self):
        try:
            cmd_type = request.args.get('cmd_type')
            cmd_value = request.json

            if cmd_value is None or cmd_type is None:
                return self.response_class(
                    response=json.dumps({'Error': 'missing data'}),
                    status=400,
                    mimetype="application/json")

            uid = cmd_value['uid']

            if cmd_type == 'upload_module' or cmd_type == 'upload_file':
                self.upload_module_or_file(cmd_value, uid, cmd_type)
                return self.response_class(
                    response=json.dumps({'status': "success"}),
                    status=200,
                    mimetype="application/json")

            if cmd_type in self.command_dict.keys():
                self.command_dict[cmd_type](cmd_value, uid)
                return self.response_class(
                    response=json.dumps({'status': "success"}),
                    status=200,
                    mimetype="application/json")

        except Exception as e:
            logger.exception(f'Error from execute_command_by_type: {e}')
            return self.response_class(
                response=json.dumps({'status': "failed to execute command check with the server admin"}),
                status=403,
                mimetype="application/json")

    def upload_files(self, content_type):
        try:
            file_names = []

            files = request.files.to_dict()
            if not files:
                return self.response_class(response=json.dumps({'status': "No selected files"}),
                                          status=404,
                                          mimetype="application/json")
            if content_type == "modules":
                self.config['UPLOAD_FOLDER'] = MODULE_UPLOAD_FOLDER
            if content_type == "files":
                self.config['UPLOAD_FOLDER'] = FILE_UPLOAD_FOLDER

            for child_file in files.values():
                file_name = child_file.filename
                file_names.append(file_name)
                content = child_file.read()
                child_file.seek(0)
                logger.info(f'file {file_name} length: {len(content)}')

                child_file.save(os.path.join(self.config['UPLOAD_FOLDER'], file_name))
                child_file.close()

            return self.response_class(
                response=json.dumps({'status': "success", 'message': "Files: %s has been saved" % file_names}),
                status=200,
                mimetype="application/json")

        except Exception as e:
            logger.exception(f'Error from upload_files: {e}')
            return self.response_class(
                response=json.dumps({'status': "unable to upload files. check with the server admin"}),
                status=404,
                mimetype="application/json")

    def goodbye(self):
        self.db.shut_down()


def configure_log():
    logger.setLevel(logging.DEBUG)
    f_handler = logging.FileHandler('turbo_kanban.log')
    f_handler.setLevel(logging.DEBUG)
    f_format = logging.Formatter('%(levelname)s %(asctime)s - %(filename)s - %(lineno)d - %(message)s')
    f_handler.setFormatter(f_format)
    logger.addHandler(f_handler)


def main():
    try:
        validate_dir(MODULE_UPLOAD_FOLDER)
        validate_dir(FILE_UPLOAD_FOLDER)
        configure_log()
        turbo_kanban_app = TurboKanbanApp("turbo_kanban")
        turbo_kanban_app.run(host='0.0.0.0', port=8080)
    except Exception as e:
        logger.exception(e)

    finally:
        turbo_kanban_app.goodbye()


if __name__ == '__main__':
    main()
