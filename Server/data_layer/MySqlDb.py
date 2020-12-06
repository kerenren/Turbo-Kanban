#!/bin/python3

import threading
import mysql.connector
import logging
from decouple import config
from mysql.connector import Error


logger = logging.getLogger("kanban")


class MySqlDb:
    def _connect(self):
        self.lock = threading.Lock()
        try:
            self._conn = mysql.connector.connect(
                host="localhost",
                user=config('MYSQL_USER'),
                password=config('PASSWORD'),
                database=config('DATA_BASE')
            )
        except Exception as e:
            return f"There was an error, please inform the server administrator. error message: {e}"
        self.cursor = self._conn.cursor(prepared=True)
        self._conn.autocommit = False
        logger.info('Connected to MySql DB turboDB')

    def __init__(self):
        self._connect()

    def execute_sql_query(func):
        def wrapper(self, *args):
            with self.lock:
                try:
                    retvalue = self.cursor.execute(*func(self, *args))
                    self._conn.commit()
                    logger.info(f"Record {self.cursor.rowcount} executed successfully")
                    return retvalue
                except Error as error:
                    logger.exception(f"failed with error {error}")
                    self._conn.rollback()
                    return None
        return wrapper

    @execute_sql_query
    def add_command(self, paramter_one, paramter_two, paramter_three, paramter_four):
         # The parameter names were replaced for confidentiality purposes
        insert_query = "This query has been removed for confidentiality purposes"
        return insert_query, (paramter_one, paramter_two, paramter_three, paramter_four)

    @execute_sql_query
    def upload_file_or_module(self, paramter_one, paramter_two, paramter_three, paramter_four):
         # The parameter names were replaced for confidentiality purposes
        insert_query = "This query has been removed for confidentiality purposes"
        return insert_query, (paramter_one, paramter_two, paramter_three, paramter_four)

    @execute_sql_query
    def add_delete_module_to_db(self, paramter_one, paramter_two):
         # The parameter names were replaced for confidentiality purposes
        insert_query = "This query has been removed for confidentiality purposes"
        return insert_query, (paramter_one, paramter_two)

    @execute_sql_query
    def add_stop_module_to_db(self, paramter_one, paramter_two):
         # The parameter names were replaced for confidentiality purposes
        insert_query = "This query has been removed for confidentiality purposes"
        return insert_query, (paramter_one, paramter_two)

    @execute_sql_query
    def add_update_config_to_db(self, paramter_one, paramter_two):
         # The parameter names were replaced for confidentiality purposes
        insert_query = "This query has been removed for confidentiality purposes"
        return insert_query, (paramter_one, paramter_two)

    def get_bot_view(self):
        data = []
        query = "This query has been removed for confidentiality purposes"
        with self.lock:
            try:
                self.cursor.execute(query)
            except Error as e:
                logger.exception("Failed to execute get_bot_view rollback: {}".format(e))
                self._conn.rollback()
                return data
            rows = self.cursor.fetchall()
            for row in rows:
                data.append({'parameter_one': row[0], 'parameter_two': row[1], 'parameter_three': row[2],
                             'parameter_four': row[3], 'parameter_five': row[4]}) # The parameter names were replaced for confidentiality purposes
        return data

    def get_logs_by_bot(self, uid):
        logs = []
        query = "This query has been removed for confidentiality purposes"
        with self.lock:
            try:
                self.cursor.execute(query, (uid,))
            except Error as e:
                logger.exception(f"Failed to get logs for bot {uid}! Rolling back the DB!")
                self._conn.rollback()
                return logs
            rows = self.cursor.fetchall()
            for row in rows:
                logs.append(row)
        return logs

    def shut_down(self):
        with self.lock:
            self.cursor.close()
            self._conn.close()
        logger.info("The mySql connection is closed")
