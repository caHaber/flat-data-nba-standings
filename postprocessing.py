#!/usr/bin/python
from bs4 import BeautifulSoup
import pandas as pd
import csv

# NBA teams and their abbriviations

with open('NBA_2022.html', 'r') as f:

    html = f.read()

    soup = BeautifulSoup(html, features='lxml')

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

    # # use findALL() to get the column headers

    # soup.findAll('tr', limit=2)

    # # use getText()to extract the text we need into a list

    # headers = [th.getText() for th in soup.findAll('tr',
    #            limit=2)[1].findAll('th')]

    # # avoid the first header row

    # rows = soup.findAll('tr')

    # player_stats = []
    # for i in range(2, len(rows) - 1):
    #     player = []

    #     for child in rows[i].recursiveChildGenerator():
    #         name = getattr(child, 'name', None)
    #         if name is not None:
    #             if name is 'a' or name is 'em':
    #                 print('')
    #         elif not child.isspace():

    #                                   # leaf node, don't print spaces

    #             player.append(child)
    #             break

    #     for td in rows[i].findAll('td'):
    #         player.append(td.getText().replace(',', ''))

    #     if len(player[0]) > 0:
    #         player_stats.append(player)

    # last_row = []
    # last_row.append('Team Totals')
    # for td in rows[len(rows) - 1].findAll('td'):
    #     last_row.append(td.getText().replace(',', ''))

    # player_stats.append(last_row)

    # stats = pd.DataFrame(player_stats, columns=headers)


    # stats.to_csv(
    #     'data/teams/{}.csv'.format(team[1]),
    #     sep=',',
    #     encoding='utf-8',
    #     index=False,
    #     quoting=csv.QUOTE_NONE,
    #     quotechar='',
    #     escapechar='\\',
    #     )
