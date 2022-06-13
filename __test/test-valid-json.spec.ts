import fs from "fs/promises";

test("should first", async () => {
  let exerciseArray: Array<Record<string, string>> = [];

  try {
    const files = await fs.readdir(__dirname + "/../exercises/");

    for (const file of files) {
      try {
        const exercise = await fs.readFile(
          __dirname + "/../exercises/" + file,
          "utf8"
        );
        const exerciseJSON = JSON.parse(exercise);
        exerciseArray.push(exerciseJSON);
      } catch {
        // ignore
      }
    }
  } catch (error) {
    console.log(error);
  }

  let availableIDs: string[] = [];
  for (let i = 0; i < exerciseArray.length; i++) {
    if (!exerciseArray.find((exercise) => exercise.id === i.toString())) {
      availableIDs.push(i.toString());
    }
  }

  console.log({
    numberOfExercises: exerciseArray.length,
    availableIDs,
  });
  expect(exerciseArray.length).toBeGreaterThan(20);
});
