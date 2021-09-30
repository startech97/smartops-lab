import pandas as pd
import sys
df = pd.read_excel(f'uploads/{sys.argv[1]}')

df_score = pd.DataFrame(df.head(2))
df_main = df.drop(df.index[[0,1]])
df_midl = pd.DataFrame(df_main)

for column in df_midl:
    df_midl[column] = (100*(df_midl[column]-df_score[column].iloc[1]))/(df_score[column].iloc[0]-df_score[column].iloc[1])


df_copy_res_mid =  pd.DataFrame(index=[0],columns=df_midl.columns)
for column in df_midl:
    df_copy_res_mid[column] = df_midl[column].sum()/ len(df_midl[column])

data = df_main.corr(method='spearman')
arr = []
for column in data:
    data[column] = data[column]**2
df_copy = pd.DataFrame(index=[0],columns=df_main.columns)

for column in data:
    df_copy[column] = data[column].sum()

res = pd.concat([df_copy, df_copy_res_mid], ignore_index=True)

print(res.to_json())