#!/bin/python3

import os


def get_dir_info_by_path(path):
    result_files = []

    walk_obj = os.walk(path)

    for items in walk_obj:
        root = items[0]
        files = items[2]

        for child_file in files:
            file_path = os.path.join(root, child_file)
            file_statinfo = os.stat(file_path)
            last_modified_sec = file_statinfo.st_mtime
            size = file_statinfo.st_size
            result_files.append({'file_path': file_path, 'last_modified_sec': last_modified_sec, 'size': size})

    return result_files


def validate_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)
        return True
    return False
