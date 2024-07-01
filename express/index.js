const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()
const fileUpload = multer({ dest: './uploads/' })
const fs = require('fs');
const csvParser = require("csv-parser");
const port = process.env.EXPRESS_PORT || 3030

const { isNull, eq, map, isEmpty} = require('lodash/fp')
const { differenceInDays, min, max } = require("date-fns");

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send("Welcome to the Express server!")
})

app.post('/process-file', fileUpload.single('csv'), (req, res) => {
  const filePath = req.file.path;
  const projects = {};

  fs.createReadStream(filePath)
    // Parse csv file.
    .pipe(csvParser())
    .on('data', data => {
      // Extreact employee data
      const { EmpID, ProjectID, DateFrom, DateTo} = data

      if (!projects[ProjectID]) {
        // If there is no record for this project add one.
        projects[ProjectID] = [];
      }

      projects[ProjectID].push({
        EmpID,
        DateFrom: isNull(DateFrom) || eq("NULL")(DateFrom) ? new Date() : new Date(DateFrom),
        DateTo: isNull(DateTo) || eq("NULL")(DateTo) ? new Date() : new Date(DateTo),
      });
    })
    .on('end', () => {
      const pairs = []

      map((projectId) => {
        const project = projects[projectId];
        project.map((employee, index) => {
          for (let employeeIndex = index + 1; employeeIndex < project.length; employeeIndex++) {
            const employee2 = project[employeeIndex];

            if (eq(employee.EmpID)(employee2.EmpID))
              break;

            if (!isEmpty(employee) && !isEmpty(employee2)) {
              // Get the soonest date both employees worked on the project.
              const startRange = max([employee.DateFrom, employee2.DateFrom])
              // Get the oldest date both employees worked on the project.
              const endRange = min([employee.DateTo, employee2.DateTo])
              // Calculate the number of days employees worked on the project.
              const workTogether = differenceInDays(endRange, startRange)

              if (workTogether > 0) {
                // If number of days employees worked together is positive,
                // add them to the response object.
                pairs.push({
                  employee: employee.EmpID,
                  employee2: employee2.EmpID,
                  projectId: projectId,
                  workTogether
                })
              }
            }
          }
        })
      })(Object.keys(projects))

      return res.json(pairs)
    })
});
