## post endpoints

1. for liking :
   http://localhost:8082/mod_doc/likes
   patch
   req.body = { 
      c_id :"content er id", 
      owner_id : "ke like korche", 
      action: true for like and false for unlike
   }

2.  for commenting :
    http://localhost:8082/mod_doc/comments
    patch
    req.body = same as liking just action(boolean) changes to body(string)


    for deleting a comment
    http://localhost:8082/mod_doc/deleteComment
    patch
    req.body  =
    {
      c_id: "content id",
      comment_id: "comment id"
    }

    for editiing a comment
    http://localhost:8083/mod/comment
    patch
    req.body
    {
      c_id = "", 
      commentId = "",
      body = "changed body of comment" 
    }
:

3. for sharing:
    http://localhost:8083/add/share
    post
    req.body 
    { jei obj ta toke kal pathiechilam dekh desc te emoji dewa.......bollam 
      changed input obj eta...........otai req.body te parbi
    }


    for deleting a share:
    http://localhost:8082/del_doc/delete_share?id= ekhane shared post er id jabe
    delete
      
4. for deleting a post 
    delete
    http://localhost:8082/del_doc?id= ekhane post er id ta jabe


5. Editing any post
   http://localhost:8082/mod_doc/text
   patch
   req.body
   {
      id: ekhane post er id
      desc: changed description or body of post
   }