import traceback
import uvicorn
import logging as log

log.basicConfig(level=log.INFO)

def main():
    uvicorn.run("app:app", log_level="debug", host="localhost", port=8000, workers=1)

if __name__ == '__main__':
    try:
        main()
    except Exception as generic:
        log.info(f"Exception generica: {generic}")
        log.info(f"Traceback: {traceback.format_exc()}")
