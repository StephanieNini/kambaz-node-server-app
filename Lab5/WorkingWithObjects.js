const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };

    const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };

   const setAssignmentTitle = (req, res) => {
   const { newTitle } = req.params;
   assignment.title = newTitle;
   res.json(assignment);
 };

const moduleData = {
  id: "M101",
  name: "Web Development",
  description: "Learning NodeJS and React",
  course: "CS5610",
};

 app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);

   // Return the whole module object
  app.get("/lab5/module", (req, res) => {
    res.json(moduleData);
  });

  // Return only the module name
  app.get("/lab5/module/name", (req, res) => {
    res.json(moduleData.name);
  });

  // Update module name
  app.get("/lab5/module/name/:newName", (req, res) => {
    moduleData.name = req.params.newName;
    res.json(moduleData);
  });

  // Update module description
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    moduleData.description = req.params.newDescription;
    res.json(moduleData);
  });

  // Update assignment score
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    assignment.score = parseInt(req.params.newScore);
    res.json(assignment);
  });

  // Update assignment completed status
  app.get("/lab5/assignment/completed/:completed", (req, res) => {
    assignment.completed = req.params.completed === "true";
    res.json(assignment);
  });
}
