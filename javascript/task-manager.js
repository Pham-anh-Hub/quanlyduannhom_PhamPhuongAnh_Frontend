const userLoging = JSON.parse(localStorage.getItem("userLoging"));
const userAccounts = JSON.parse(localStorage.getItem("userAccounts"));
const alreadyLogIn = JSON.parse(localStorage.getItem("alreadyLogIn"));
const listProject = JSON.parse(localStorage.getItem("listProject"));
const modelEditStatus = document.querySelector("#modelEditStatus");

if (alreadyLogIn) {
  let projectRender = [];
  let projectTaskList = [];
  listProject.forEach((item) => {
    for (let i = 0; i < item.tasks.length; i++) {
      if (item.tasks[i].assignee.id === userLoging.id) {
        let checkTask = projectRender.find(
          (project) => project.projectName == item.projectName
        );
        if (checkTask) {
          checkTask.projectTaskList.push(item.tasks[i]);
        } else {
          let projectTask = {
            projectName: item.projectName,
            projectTaskList: [item.tasks[i]],
          };
          projectRender.push(projectTask);
        }
      }
    }
  });
  console.log(projectRender);
  // // render ra giao diện
  document.querySelector("#userRenderName").textContent = userLoging.fullName;
  function renderTasks() {
    document.querySelector("#firstProjectPart").innerHTML = "";
    projectRender.forEach((project) => {
      let prjTaskList = project.projectTaskList;
      document.querySelector(
        "#firstProjectPart"
      ).innerHTML += `<div id="projectTitle">
                      <span id="accorditionItem"><img src="../icons/accorditionVecto.png" /> ${project.projectName}</span>
                        </div>`;
      for (let i = 0; i < prjTaskList.length; i++) {
        document.querySelector(
          "#firstProjectPart"
        ).innerHTML += `<div id="firstProjectContent">
                            <div id="prjTaskName">${
                              prjTaskList[i].taskName
                            }</div>
                            <div id="prjTaskPriority"><span class="${
                              prjTaskList[i].priority === "Thấp"
                                ? "lowPriority"
                                : prjTaskList[i].priority === "Cao"
                                ? "highPriority"
                                : "midPriority"
                            }">${prjTaskList[i].priority}</span></div>
                            <div id="prjTaskStatus">${
                              prjTaskList[i].taskStatus
                            }<span> <img onclick="editStatus(${
          prjTaskList[i].taskId
        })" id="editStatusIcon" src="../icons/progressIcon.png" /></span></div>
                            <div id="taskAssignDate">${
                              prjTaskList[i].assignDate.split("-")[1]
                            } - ${prjTaskList[i].assignDate.split("-")[2]}</div>
                            <div id="taskDeadline">${
                              prjTaskList[i].dueDate.split("-")[1]
                            } - ${prjTaskList[i].dueDate.split("-")[2]}</div>
                            <div id="prjtaskProgress"><span class="${
                              prjTaskList[i].progress === "Đúng tiến độ"
                                ? "on-schedule"
                                : prjTaskList[i].progress === "Trễ hạn"
                                ? "off-schedule"
                                : "risk-schedule"
                            }">${prjTaskList[i].progress}</span></div>
                        </div>`;
      }
    });
  }
  // Đăng xuất
  document.querySelector("#logOutNav").addEventListener("click", function () {
    localStorage.setItem("alreadyLogIn", false);
    window.location.href = "logIn.html";
  });

  renderTasks();

  function editStatus(id) {
    const confirmEdit = document.querySelector("#btnConfirm");
    const taskEditStt = projectRender.find((project) =>
      project.projectTaskList.find((task) => task.taskId === id)
    );
    const indexEdit = taskEditStt.projectTaskList.find(
      (task) => task.taskId === id
    );
    console.log(indexEdit);
    modelEditStatus.style.display = "block";

    confirmEdit.onclick = function () {
      console.log(indexEdit);

      if (indexEdit.taskStatus == "To do") {
        indexEdit.taskStatus = "In Progress";
      } else if (indexEdit.taskStatus == "In Progress") {
        console.log(indexEdit.taskStatus);

        indexEdit.taskStatus = "Pending";
        console.log(indexEdit.taskStatus);
      } else if (indexEdit.taskStatus == "Pending") {
        if (indexEdit.assignee.role === "projectOwner") {
          indexEdit.taskStatus = "Done";
        } else {
          indexEdit.taskStatus = "In Progress";
        }
      }
      renderTasks();
      localStorage.setItem("listProject", JSON.stringify(listProject));

      modelEditStatus.style.display = "none";
    };

    document.querySelector("#btnCancel").addEventListener("click", function () {
      modelEditStatus.style.display = "none";
    });
    document.querySelector("#exitModel").addEventListener("click", function () {
      modelEditStatus.style.display = "none";
    });
  }
} else {
  window.location.href = "logIn.html";
}
