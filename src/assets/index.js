// index.js (inside the "images" folder)
const importAll = (context) => {
  //  console.log("work1");

  const images = {};
  context.keys().forEach((filename) => {
    console.log("work");
    // console.log("path", filename, context(filename).default, context(filename));
    const image = context(filename);
    const imageName = filename.replace("./", "").replace(/\.\w+$/, ""); // Remove './' and the file extension
    images[imageName] = {
      src: image,
      alt: imageName,
    };
  });
  return images;
};

console.log("work2");

// Update the path to the new image folder here
const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

// console.log("work1", require.context("./images", false, /\.(png|jpe?g|svg)$/));
console.log("work2", images);

export default images;
