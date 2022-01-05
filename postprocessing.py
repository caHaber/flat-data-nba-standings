#!/usr/bin/python
from bs4 import BeautifulSoup
import pandas as pd
import csv

# NBA teams and their abbriviations

with open('NBA_2022.html', 'r') as f:

    html = f.read()

    soup = BeautifulSoup(html, features='html.parser')

    data = pd.read_html(soup.text)
    data.to_csv(
        'df_output.csv',
        sep=',',
        encoding='utf-8',
        index=False,
        quoting=csv.QUOTE_NONE,
        quotechar='',
        escapechar='\\',
        )