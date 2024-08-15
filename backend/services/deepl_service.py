import deepl
from typing import Union, Iterable
from backend.utilities.aws_utility import AwsUtility

import logging as log

log.basicConfig(level=log.INFO)


class DeeplService(AwsUtility):
    def __init__(self):
        super().__init__()
        self.base_url = 'https://api-free.deepl.com/v2'
        self.api_key = self.init_service('ssm').get_parameter(Name='deepl_api_key')['Parameter']['Value']
        self.translator = deepl.Translator(self.api_key)
        self._health_check()

    def _health_check(self):
        self.usage = self.translator.get_usage()
        target_languages = self.translator.get_target_languages()
        self.target_languages = [l.code for l in target_languages]
        source_languages = self.translator.get_source_languages()
        self.source_languages = [l.code for l in source_languages]
        return

    def translate_text(self, text: Union[str, Iterable[str]], source_lang: str, target_lang: str):
        try:
            assert source_lang in self.source_languages, 'Invalid source language'
            assert target_lang in self.target_languages, 'Invalid target language'
            return self.translator.translate_text(
                text,
                source_lang=source_lang,
                target_lang=target_lang,
                formality=deepl.Formality.DEFAULT
            )
        except AssertionError as e:
            log.critical(e)
            return None


# if __name__ == '__main__':
#     # Exemplo de uso
#     deepl_service = DeeplService()
#     translated_text = deepl_service.translate_text(
#         "I am an example sentence",
#         source_lang="EN",
#         target_lang="PT-BR",
#     )
#     print(f"TEXTO TRADUZIO: {translated_text}")
