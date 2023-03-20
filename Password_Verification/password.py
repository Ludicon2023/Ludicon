import smtplib, ssl
import asyncio
import random
from inputimeout import inputimeout
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# python -m smtpd -c DebuggingServer -n localhost:1025
#tutorial to start
# https://realpython.com/python-send-email/#option-2-setting-up-a-local-smtp-server

port = 465
# password = input # blind password = getpass module

smtp_server = "smtp.gmail.com"
while True:
    while True:
        sender_email = input("Type your username and press enter: ")
        if sender_email[-4:] == ".edu":
            break
        print("Your email must be from an educational institution")
    sender_email = "reece.riherd@utexas.edu"  # Enter your address
    password = 'ugmhggfubgnetkgx'
    receiver_email = "reece.riherd@gmail.com"  # Enter receiver address
    # password = input("Type your password and press enter: ")
    number = random.randrange(0, 9999, 1)
    number = str(number)
    while len(number) != 4:
        number = "0" + number

    message = MIMEMultipart("alternative")
    message["Subject"] = "Email Verification from Ludicon"
    message["From"] = sender_email
    message["To"] = receiver_email
    text = MIMEText("Your verification code is " + number,"plain")
    message.attach(text)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server,port,context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email,receiver_email,message.as_string())

    print("sent email")
    try:
        if inputimeout(prompt="Type the verification code sent to your email and type enter:",timeout=60) == number:
            break
    except Exception:
        print("Time expired. Please get a new code.")
print("done")
