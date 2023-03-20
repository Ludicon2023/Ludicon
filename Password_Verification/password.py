import smtplib, ssl
import asyncio
# python -m smtpd -c DebuggingServer -n localhost:1025
#tutorial to start
# https://realpython.com/python-send-email/#option-2-setting-up-a-local-smtp-server

port = 465
# password = input # blind password = getpass module

context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.gmail.com",port,context=context) as server:
    server.login("reece.riherd@utexas.edu", 'ugmhggfubgnetkgx')

print("done")