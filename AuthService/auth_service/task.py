from time import sleep
from celery import shared_task
from django.core.mail import send_mail
import requests
import json


@shared_task
def send_mail_celery(name, email, otp):
    print(name, email, otp)
    # send_mail("GleeGo Email Verification OTP",
    #           f"Your OTP for GleeGo Verification is {otp}. Dont Share it with any one. Enter this OTP in the OTP field to activate your account", "GleeGo <anipal0@outlook.com>", [email],)
    # for i in range(10):
    #     sleep(2)
    #     print("mail send")
    requests.post("http://localhost:5000/sendEmail/", {
        "email": f"{email}",
        "message": json.dumps({
            "heading": f"Hello Mr./Mrs. {name}",
            "body": f"Your OTP for GleeGo Verification is {otp}. Dont Share it with any one. Enter this OTP in the OTP field to activate your account",
            "subject": "GleeGo Email Verification OTP"
        })
    })
    return None
