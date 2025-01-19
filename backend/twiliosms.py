from twilio.rest import Client

account_sid = 'AC17458fb10d3d086e15741d063c525a6d'
auth_token = 'a448a0abceff90271e1e062b18a65e7c'
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='+16203018236',
  body='hello how are you',
  to='+16046037753'
)

print(message.sid)