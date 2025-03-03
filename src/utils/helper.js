export const ListHopes = (hopes) => {
  hopes.forEach((hopes) => {
    console.log("\n");
    console.log(`id: ${hopes.id}`);
    console.log(`content: ${hopes.content}`);
    console.log(`tags: ${hopes.tags.join(",")}`);
  });
};
