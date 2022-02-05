exports.form = function(req, res){
    message = '';
   if(req.method == "POST"){
     
      var post  = req.body;
      var item= post.item_name;
      var price= post.item_price;
   
 
      if (!req.files)
                return res.status(400).send('No files were uploaded.');
 
        var file = req.files.uploaded_image;
        var img_name=file.name;
 
         if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('assets/images/upload_images/'+file.name, function(err) {
                 
                             
                  if (err){
                   
                    return res.status(500).send(err);
                  }
                        var sql = "INSERT INTO `ecommerce_items`(`item_name`,`item_price`,`image`) VALUES ('" + item + "','" + price + "','" + img_name + "')";
 
                            var query = db.query(sql, function(err, result) {
                                 res.redirect('main');
                            });
                       });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('form.ejs',{message: message});
          }
   } else {
      res.render('form');
   }
 
};
exports.main = function(req, res){
    var message = '';
    var id = req.params.id;
    var sql="SELECT * FROM `ecommerce_items`";
    db.query(sql, function(err, result){
      if(result.length <= 0)
      message = "Profile not found!";
     
      res.render('main.ejs',{data:result, message: message});
    });
    };
