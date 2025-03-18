@echo off

@REM router
start python web-sockets/main_inference.py


@REM ML model inferencing
start python web-sockets/corn_app_firebase.py
start python web-sockets/egg_app_firebase.py
start python web-sockets/guava_app_firebase.py
start python web-sockets/rice_app_firebase.py
start python web-sockets/soybean_app_firebase.py
start python web-sockets/tomato_app_firebase.py

exit
