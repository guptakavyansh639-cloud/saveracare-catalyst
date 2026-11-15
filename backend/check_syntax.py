import py_compile
import sys

try:
    py_compile.compile(r'e:/My Documents/Desktop/catalyst-mvp/backend/main.py', doraise=True)
    print('SYNTAX OK')
except py_compile.PyCompileError as e:
    print(f'SYNTAX ERROR: {e}')
    sys.exit(1)
