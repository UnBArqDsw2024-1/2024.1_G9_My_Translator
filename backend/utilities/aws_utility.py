import boto3
import base64 as b64


class AwsUtility:
    def __init__(self, region: str = 'us-east-1'):
        self.region = region
        self.access_key = b64.b64decode('QUtJQTZJWTM1NjNFTVczTlU1TTI=').decode()
        self.secret_key = b64.b64decode('UnpINnVmem1EUXJGZjN2c3lzWGFMeUdrL242L1FlOG1tdVB3ZksvaQ==').decode()
        self.session = boto3.Session(
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
            region_name=self.region
        )

    def init_service(self, service: str):
        return self.session.client(service, self.region)
