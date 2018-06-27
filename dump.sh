tsk_loaddb "$1" -d sleuth.db
sqlite3 -header -csv sleuth.db "select * from tsk_files;" > tsk_files.csv
