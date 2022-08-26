from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=5000, stop_words='english')
df = pd.read_excel(
    r"D:\Smart India Hackathon 22\backend\SIH2022-Services-Backends\ChatBot\dataset.xlsx")
df.columns = ["questions", "answers"]
df["questions"] = df["questions"].str.lower()
vector = cv.fit_transform(df["questions"]).toarray()
similarity = cosine_similarity(vector)


def recommend(movie):
    index = df[df['questions'].str.contains(movie)]
    # print(index)
    if not index.empty:
        index = df[df['questions'].str.contains(movie)].index[0]
        # print(index)
    else:
        print("Not recognize")
        return "Sorry We can't recognize !"
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    # for i in distances[0:2]:
    #     print(df.iloc[i[0]].answers)
    return df.iloc[distances[0][0]].answers


recommend("chat")
