// const ob = {
//   asset_id: "3cbfd17f648e0038108dab2e7a93a844",
//   public_id: "dev_stuff/xzmyllearm8j7svvzktf",
//   version: 1657904334,
//   version_id: "60fe77eb1fa9bb063d435492442df93a",
//   signature: "71c794b543ccf375129a8032077fa1a8835ad91b",
//   width: 1199,
//   height: 578,
//   format: "jpg",
//   resource_type: "image",
//   created_at: "2022-07-15T16:58:54Z",
//   tags: [],
//   bytes: 121154,
//   type: "upload",
//   etag: "b5778ab9f76d97304b8dc0d4d976f338",
//   placeholder: false,
//   url: "http://res.cloudinary.com/cloud-neel-arya/image/upload/s--M6Pcy37i--/v1657904334/dev_stuff/xzmyllearm8j7svvzktf.jpg",
//   secure_url:
//     "https://res.cloudinary.com/cloud-neel-arya/image/upload/s--M6Pcy37i--/v1657904334/dev_stuff/xzmyllearm8j7svvzktf.jpg",
//   folder: "dev_stuff",
//   access_mode: "authenticated",
//   api_key: "288368428136192",
// };


// if (cluster.isPrimary) {
//   console.log(`Primary instance ${process.pid} is running`);
//   for (let i = 0; i < cpus().length; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`LOST WORKER ${worker.process.pid}`);
//     cluster.fork();
//   });
// } else {
//   app.listen(port, (err) => {
//     if (err) return console.log(err);
//     console.log(
//       `[${cluster.worker.id}] Worker instance [${process.pid}] is running on http://localhost:${port}`
//     );
//   });
// }