
GET placeholder_data/_search
{
  "aggs": {
    "by_city": {
      "terms": {
        "field": "address",
        "size": 100
      }
    }
  }
}

// match: {
//   title: {
//     query: text,
//     operator: 'or',
//   },
// },
// match_phrase: {
//   desc: {
//     query: text,
//     // operator: 'or', // operator will not work with match_phrase
//   },
// },


{
  "doc": {
    "id": "kol700053",
    "title": "Neel Arya",
    "desc": "this is a picture, probably so all the best buddy",
    "file": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
    "like_count": 23,
    "owner_id": 123,
    "group_id": 321,
    "access": "this is a varchar",
    "comment_count": 44,
    "share_count": 55,
    "is_shared": true,
    "share_owner": 78
  }
}


import { faker } from "@faker-js/faker";


// INDEXING DUMMY DATA: SUCCESSFULLY INDEXED 1K DATAPOINTS
router.route("/addBulkDummy").get(async (req, res, next) => {
  let err_list = [];
  for (let i = 0; i < 0; i++) {
    const doc = {
      id: faker.datatype.uuid(),
      title: faker.lorem.words(10),
      desc: faker.lorem.words(25),
      file: faker.datatype.string(100),
      like_count: faker.datatype.number(),
      owner_id: faker.datatype.number(),
      group_id: faker.datatype.number(),
      access: faker.datatype.string(),
      comment_count: faker.datatype.number(),
      share_count: faker.datatype.number(),
      is_shared: true,
      share_owner: faker.datatype.number(),
    };
    try {
      const res = await client.index({
        index: process.env.ELASTICSEARCH_INDEX,
        body: {
          ...doc,
        },
      });
      log(i, " indexed doc: ", res);
    } catch (err) {
      log(err);
      err_list.push(err);
    }
  }
  if (err_list.length === 0) {
    res.json({ status: "All files indexed" });
    console.log("All files indexed");
  }
});




/* DUMPING  FAKERJS CODE FROM ELASTIC SEARCH  */
// INDEXING DUMMY DATA: SUCCESSFULLY INDEXED 1K DATAPOINTS
// router.route("/addBulkDummy").get(async (req, res, next) => {
//   let err_list = [];
//   for (let i = 0; i < 1000; i++) {
//     const doc = {
//       id: faker.datatype.uuid(),
//       title: faker.lorem.words(10),
//       desc: faker.lorem.words(25),
//       file: faker.datatype.string(100),
//       like_count: faker.datatype.number(),
//       owner_id: faker.datatype.number(),
//       group_id: faker.datatype.number(),
//       access: faker.datatype.string(),
//       comment_count: faker.datatype.number(),
//       share_count: faker.datatype.number(),
//       is_shared: true,
//       share_owner: faker.datatype.number(),
//     };
//     const id = doc.id;
//     try {
//       const res = await client.index({
//         index: process.env.ELASTICSEARCH_INDEX,
//         id,
//         body: {
//           ...doc,
//         },
//       });
//       log(i, " indexed doc: ", res);
//     } catch (err) {
//       log(err);
//       err_list.push(err);
//     }
//   }
//   if (err_list.length === 0) {
//     res.json({ status: "All files indexed" });
//     console.log("All files indexed");
//   }
// });

//