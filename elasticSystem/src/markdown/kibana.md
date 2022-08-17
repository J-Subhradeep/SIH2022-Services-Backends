GET contents/_search
{
  "size": 1000, 
  "query": {
    "match_all": {}
    
  }
}

GET _cluster/health

GET _nodes/stats


GET _cat/shards/contents

PUT /contents
{
  "settings": {
    "index": {
      "number_of_shards": 2,  
      "number_of_replicas": 2 
    }
  }
}


GET /contents/_doc/96b708be-8531-45ba-9e2d-56eef179b593


GET /contents/

DELETE /contents