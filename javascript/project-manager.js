// kiểm tra trạng thái đăng nhập
const userAccounts = JSON.parse(localStorage.getItem("userAccounts"));
const alreadyLogIn = JSON.parse(localStorage.getItem("alreadyLogIn"));
const listProject = JSON.parse(localStorage.getItem("listProject"));

if (alreadyLogIn) {
  // Lấy ra project và vị trí đã chọn
  const taskIndex = window.location.href.split("?task=")[1];
  console.log("Task Index: ", taskIndex);
  const projectOpen = listProject[taskIndex];
  console.log("projectOpen: ", projectOpen);

  //render list Task của project đã mở
  const taskList = listProject[taskIndex].tasks;
  console.log("TaskList: ", taskList);
  // list Member
  const memberList = listProject[taskIndex].member;
  console.log("memberList: ", memberList);

  // tạo biến check trạng thái edit hay add
  let addEditStatus = "add";

  if (taskIndex !== undefined) {
    // Tạo Accordition cho mỗi list task
    document
      .querySelector("#TodoListTitle")
      .addEventListener("click", function () {
        console.log(document.querySelector("#todoListContent"));
        document
          .querySelector("#todoListContent")
          .classList.toggle("todoTasks-hide");
        document
          .querySelector("#accorditionIcon1")
          .classList.toggle("accorditionIconActive");
      });
    document
      .querySelector("#inProgressListTitle")
      .addEventListener("click", function () {
        console.log(document.querySelector("#inProgressListContent"));
        document
          .querySelector("#inProgressListContent")
          .classList.toggle("inprogressTasks-hide");
        document
          .querySelector("#accorditionIcon2")
          .classList.toggle("accorditionIconActive");
      });
    document
      .querySelector("#pendingListTitle")
      .addEventListener("click", function () {
        console.log(document.querySelector("#pendingListContent"));
        document
          .querySelector("#pendingListContent")
          .classList.toggle("pendingTasks-hide");
        document
          .querySelector("#accorditionIcon3")
          .classList.toggle("accorditionIconActive");
      });
    document
      .querySelector("#doneListTitle")
      .addEventListener("click", function () {
        console.log(document.querySelector("#doneListContent"));
        document
          .querySelector("#doneListContent")
          .classList.toggle("doneTask-hide");
        document
          .querySelector("#accorditionIcon4")
          .classList.toggle("accorditionIconActive");
      });

    // render ra tên và mô tả dự án
    document.querySelector("#titleLeftBlock").textContent =
      projectOpen.projectName;
    document.querySelector("#discriptProject").textContent =
      projectOpen.discription;
  }

  renderTaskList(taskList);

  document.querySelector("#logOut").addEventListener("click", function () {
    localStorage.setItem("alreadyLogIn", JSON.stringify(false));
    localStorage.setItem("userLoging", JSON.stringify(""));
  });
} else {
  // Mời đăng nhập
  window.location.href = "logIn.html";
}
// }

// Hàm render taskList
function renderTaskList(array) {
  let todoTaskList = array.filter((task) => task.taskStatus === "To do");
  console.log(todoTaskList);
  let inprogressTaskList = array.filter(
    (task) => task.taskStatus === "In Progress"
  );
  console.log(inprogressTaskList);
  let pendingTaskList = array.filter((task) => task.taskStatus === "Pending");
  console.log(pendingTaskList);
  let doneTaskList = array.filter((task) => task.taskStatus === "Done");
  console.log(doneTaskList);

  // render todoTask
  document.querySelector("#todoListContent").innerHTML = ""; // reset nội dung của todoTask
  for (let i = 0; i < todoTaskList.length; i++) {
    document.querySelector("#todoListContent").innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần todoList  -->
      <div id="taskName">${todoTaskList[i].taskName}</div>
      <div id="projectMember">${todoTaskList[i].assignee.fullName}</div>
      <div id="Priority"><span id=${todoTaskList[i].priority === "Thấp" ? "lowPriority" : todoTaskList[i].priority === "Cao" ? "highPriority" : "mediumPriority"}>${todoTaskList[i].priority}</span></div>
      <div id="startDate">${todoTaskList[i].assignDate.split("-")[1]} - ${todoTaskList[i].assignDate.split("-")[2]}</div>
      <div id="deadLine">${todoTaskList[i].dueDate.split("-")[1]} - ${todoTaskList[i].dueDate.split("-")[2]}</div>
      <div id="Progress"><span id= ${todoTaskList[i].progress === "Đúng tiến độ" ? "on-schedule" : todoTaskList[i].progress === "Có rủi ro" ? "risk-schedule" : "off-schedule"}>${todoTaskList[i].progress}</span></div>
      <div id="actionToTask">
          <span><button id="editBtn" onclick="editTask(${todoTaskList[i].taskId})">Sửa</button></span>
          <span><button id="deleteBtn" onclick="deleteTask(${todoTaskList[i].taskId})">Xóa</button></span>
      </div>
  </div>`;
  }
  // render inprogress Task
  document.querySelector("#inProgressListContent").innerHTML = ""; // reset nội dung của inprogressTask
  for (let i = 0; i < inprogressTaskList.length; i++) {
    document.querySelector("#inProgressListContent").innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần inprogressTask  -->
                      <div id="taskName">${inprogressTaskList[i].taskName}</div>
                      <div id="projectMember">${inprogressTaskList[i].assignee.fullName}</div>
                      <div id="Priority"><span id=${inprogressTaskList[i].priority === "Thấp" ? "lowPriority" : inprogressTaskList[i].priority === "Cao" ? "highPriority" : "mediumPriority"}>${inprogressTaskList[i].priority}</span></div>
                      <div id="startDate">${inprogressTaskList[i].assignDate.split("-")[1]} - ${inprogressTaskList[i].assignDate.split("-")[2]}</div>
                      <div id="deadLine">${inprogressTaskList[i].dueDate.split("-")[1]} - ${inprogressTaskList[i].dueDate.split("-")[2]}</div>
                      <div id="Progress"><span id= ${inprogressTaskList[i].progress === "Đúng tiến độ" ? "on-schedule" : inprogressTaskList[i].progress === "Có rủi ro" ? "risk-schedule" : "off-schedule"}>${inprogressTaskList[i].progress}</span></div>
                      <div id="actionToTask">
                        <span><button id="editBtn" onclick="editTask(${inprogressTaskList[i].taskId})">Sửa</button></span>
                        <span><button id="deleteBtn" onclick="deleteTask(${inprogressTaskList[i].taskId})">Xóa</button></span>
                      </div>
                    </div>`;
  }
  // render pending Task
  document.querySelector("#pendingListContent").innerHTML = ""; // reset nội dung của pendingTask
  for (let i = 0; i < pendingTaskList.length; i++) {
    document.querySelector("#pendingListContent").innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần pendingTask  -->
      <div id="taskName">${pendingTaskList[i].taskName}</div>
      <div id="projectMember">${pendingTaskList[i].assignee.fullName}</div>
      <div id="Priority"><span id=${pendingTaskList[i].priority === "Thấp" ? "lowPriority" : pendingTaskList[i].priority === "Cao" ? "highPriority" : "mediumPriority"}>${pendingTaskList[i].priority}</span></div>
      <div id="startDate">${pendingTaskList[i].assignDate.split("-")[1]} - ${pendingTaskList[i].assignDate.split("-")[2]}</div>
      <div id="deadLine">${pendingTaskList[i].dueDate.split("-")[1]} - ${pendingTaskList[i].dueDate.split("-")[2]}</div>
      <div id="Progress"><span id= ${pendingTaskList[i].progress === "Đúng tiến độ" ? "on-schedule" : pendingTaskList[i].progress === "Có rủi ro" ? "risk-schedule" : "off-schedule"}>${pendingTaskList[i].progress}</span></div>
      <div id="actionToTask">
        <span><button id="editBtn" onclick="editTask(${pendingTaskList[i].taskId})">Sửa</button></span>
        <span><button id="deleteBtn" onclick="deleteTask(${pendingTaskList[i].taskId})">Xóa</button></span>
      </div>
    </div>`;
  }
  // render done Task
  document.querySelector("#doneListContent").innerHTML = ""; // reset nội dung của doneTask
  for (let i = 0; i < doneTaskList.length; i++) {
    document.querySelector("#doneListContent").innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần doneTask  -->
                                    <div id="taskName">${doneTaskList[i].taskName}</div>
                                    <div id="projectMember">${doneTaskList[i].assignee.fullName}</div>
                                    <div id="Priority"><span id=${doneTaskList[i].priority === "Thấp" ? "lowPriority" : doneTaskList[i].priority === "Cao" ? "highPriority" : "mediumPriority"}>${doneTaskList[i].priority}</span></div>
                                    <div id="startDate">${doneTaskList[i].assignDate.split("-")[1]} - ${doneTaskList[i].assignDate.split("-")[2]}</div>
                                    <div id="deadLine">${doneTaskList[i].dueDate.split("-")[1]} - ${doneTaskList[i].dueDate.split("-")[2]}</div>
                                    <div id="Progress"><span id= ${doneTaskList[i].progress === "Đúng tiến độ" ? "on-schedule" : doneTaskList[i].progress === "Có rủi ro" ? "risk-schedule" : "off-schedule"}>${doneTaskList[i].progress}</span></div>
                                    <div id="actionToTask">
                                        <span><button id="editBtn" onclick="editTask(${doneTaskList[i].taskId})">Sửa</button></span>
                                        <span><button id="deleteBtn" onclick="deleteTask(${doneTaskList[i].taskId})">Xóa</button></span>
                                    </div>
                                </div>`;
  }
}

// Các hoạt động với model formAdd

// Ham lấy vào input của form thêm nhiệm vụ
// Khai báo biến đếm số lượng lỗi
let countError = 0;
function getAndValidateFormAddInput() {
  // Lấy input vào //
  let taskAssigneeInput;
  document.querySelector("#assigneeInput").addEventListener("change", function () {
    const assigneeId = document.querySelector("#assigneeInput").value;
    taskAssigneeInput = memberList.find((member) => member.id == assigneeId);
  }); // Lấy ra người phụ trách
  let taskStatusInput;
  document.querySelector("#taskStatus").addEventListener("change", function () {
    taskStatusInput = document.querySelector("#taskStatus").value.trim();
  }); // Lấy ra Trạng thái công việc
  let taskPriority;
  document.querySelector(".priority").addEventListener("change", function () {
    taskPriority = document.querySelector(".priority").value.trim();
  }); // độ ưu tiên
  let taskProgress;
  document.querySelector(".progress").addEventListener("change", function () {
    taskProgress = document.querySelector(".progress").value.trim();
  }); // Lấy ra tiến độ

  // (Nhận input vào và bắt đầu validate khi nhấn nút thêm nhiệm vụ)
  document.querySelector("#saveAddEditBtn").addEventListener("click", function () {
    let taskNameInput = document.querySelector("#taskNameInput").value;
    // Lấy tên dự án
    let assignDate = new Date(document.querySelector(".assignDate").value);
    // Lấy ngày bắt đầu
    let taskDeadline = new Date(document.querySelector(".deadline").value);
    // Lấy hạn chót
    // -- Sau khi lấy được các thông tin --> validate
    // Render dữ liệu nhập vào từ form add nhiệm vụ

    // Lấy ngày hiện tại
    const currentDay = new Date().getTime();
    console.log("currentDay: ", currentDay);
    console.log(taskAssigneeInput);


    // Đã lấy ra được ngày hiện tại
    // Validate lần lượt mỗi input
    countError = 0;
    // 1. Tên nhiệm vụ
    if (!taskNameInput) {
      // thông báo tên nhiệm vụ không được để trống
      document.querySelector("#taskNameError").textContent = "Tên nhiệm vụ không được để trống";
      document.querySelector("#taskNameInput").style.borderColor = "red";
      countError++;
    } else {
      // Check xem tên task này đã tồn tại hay chưa
      const checkTaskExist = taskList.find((task) => task.taskName === taskNameInput);
      if (checkTaskExist) {
        document.querySelector("#taskNameError").textContent = "Tên nhiệm vụ đã tồn tại ";
        document.querySelector("#taskNameInput").style.borderColor = "red";
        countError++;
      } else if (taskNameInput.length > 35) {
        document.querySelector("#taskNameError").textContent = "Độ dài tên nhiệm vụ không hợp lệ";
        document.querySelector("#taskNameInput").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#taskNameError").textContent = "";
        document.querySelector("#taskNameInput").style.borderColor = "#D0D5DD";
      }
    }
    // 2. người phụ trách
    if (!taskAssigneeInput) {
      // Thông báo: người phụ trách không được để trống
      document.querySelector("#assigneeError").textContent = "Người phụ trách không được để trống";
      document.querySelector("#assigneeInput").style.borderColor = "red";
      countError++;
    } else {
      // reset
      document.querySelector("#assigneeError").textContent = "";
      document.querySelector("#assigneeInput").style.borderColor = "#D0D5DD";
    }
    // 3. Trạng thái task
    if (!taskStatusInput || taskStatusInput.value === 0) {
      // Thông báo trạng thái task không được để trống
      document.querySelector("#taskStatusError").textContent = "Trạng thái task không được để trống";
      document.querySelector("#taskStatus").style.borderColor = "red";
      countError++;
    } else {
      // reset
      document.querySelector("#taskStatusError").textContent = "";
      document.querySelector("#taskStatus").style.borderColor = "#D0D5DD";
    }
    // 4. Ngày bắt đầu
    const isAssignDateValid = !isNaN(assignDate.getTime());
    const isTaskDeadlineValid = !isNaN(taskDeadline.getTime());
    // Kiểm tra xem time nhận vào có inValid không
    if (!isAssignDateValid) {
      // nếu ngày bắt đầu để trống--> Thông báo 
      document.querySelector("#assignDateError").textContent = "Ngày bắt đầu không để trống";
      document.querySelector(".assignDate").style.borderColor = "red";
      countError++;
    } else {
      if (assignDate.getTime() <= currentDay) {
        // Ngày bắt đầu <= ngày hiện tại --> thông báo
        document.querySelector("#assignDateError").textContent = "Ngày bắt đầu phải lớn hơn ngày hiện tại";
        document.querySelector(".assignDate").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#assignDateError").textContent = "";
        document.querySelector(".assignDate").style.borderColor = "#D0D5DD";
      }
    }
    // 5. Hạn chót
    if (taskDeadline.getTime() < assignDate.getTime() || !isTaskDeadlineValid) {
      // Nếu hạn chót nhỏ hơn ngày bắt đầu --> báo lỗi
      document.querySelector("#deadlineError").textContent = "Deadline không hợp lệ";
      document.querySelector(".deadline").style.borderColor = "red";
      countError++;
    } else {
      // reset
      document.querySelector("#deadlineError").textContent = "";
      document.querySelector(".deadline").style.borderColor = "#D0D5DD";
    }
    // 6. Độ ưu tiên
    if (!taskPriority || taskPriority.value == 0) {
      // Thông báo độ ưu tiên không được để trống
      document.querySelector("#priorityError").textContent = "Độ ưu tiên không được để trống";
      document.querySelector(".priority").style.borderColor = "red";
      countError++;
    } else {
      // reset
      document.querySelector("#priorityError").textContent = "";
      document.querySelector(".priority").style.borderColor = "#D0D5DD";
    }
    // 7. Tiến độ
    if (!taskProgress || taskProgress.value == 0) {
      // Thông báo tiến độ không được để trống
      document.querySelector("#progressError").textContent = "Tiến độ không được để trống";
      document.querySelector(".progress").style.borderColor = "red";
      countError++;
    } else {
      // reset
      document.querySelector("#progressError").textContent = "";
      document.querySelector(".progress").style.borderColor = "#D0D5DD";
    }
    //   Đếm số lỗi - số lỗi === 0 --> thêm mới task
    if (countError === 0) {
      // Lấy ra ngày với tháng
      let newTask = {
        taskId: Math.round(Math.random() * 1000),
        taskName: taskNameInput,
        assignee: taskAssigneeInput,
        taskStatus: taskStatusInput,
        priority: taskPriority,
        assignDate: document.querySelector(".assignDate").value,
        dueDate: document.querySelector(".deadline").value,
        progress: taskProgress,
      };
      if (addEditStatus === "add") {
        console.log("newTask: ", newTask);
        taskList.push(newTask);
        console.log(taskList);
        localStorage.setItem("listProject", JSON.stringify(listProject));
        renderTaskList(taskList);
        document.querySelector("#formAddEdit").style.display = "none";
        resetFormAddValue();
      }
    }
  });
}

// Hàm thêm nhiệm vụ
function addTaskToProject() {
  resetFormAdd();
  document.querySelector("#formAddEdit").style.display = "block";
  renderMemberListForm(); // render ô chọn người phụ trách
  getAndValidateFormAddInput();

  exits();
}
// render member của project
function renderMemberListForm() {
  console.log(memberList);
  document.querySelector(
    "#assigneeInput"
  ).innerHTML = `<option checked value="0">Chọn người phụ trách</option>`;

  for (let i = 0; i < memberList.length; i++) {
    // console.log(memberList[i].userLoging.fullName);
    document.querySelector(
      "#assigneeInput"
    ).innerHTML += `<option value="${memberList[i].id}">${memberList[i].fullName}</option>`;
  }
}

let taskIdToDelete = null;

function deleteTask(id) {
  console.log("id cần xóa:", id);
  const task = taskList.find((item) => item.taskId === id);
  const taskIndexToDel = taskList.findIndex((item) => item.taskId === id);
  console.log("Task cần xóa:", task);
  console.log("Vị trí cần xóa:", taskIndexToDel);

  // Lưu id tạm thời
  taskIdToDelete = id;

  // Mở modal xác nhận
  document.querySelector("#modelDeleteTask").style.display = "block";
  // Gán sự kiện 1 lần khi load trang
  document.querySelector("#confirmModelDelete").onclick = function () {
    if (taskIdToDelete !== null) {
      const taskIndexToDel = taskList.findIndex((item) => item.taskId === taskIdToDelete);
      if (taskIndexToDel !== -1) {
        console.log("Task cần xóa: ", taskList[taskIdToDelete]);

        taskList.splice(taskIndexToDel, 1);
        renderTaskList(taskList);
      }
      localStorage.setItem("listProject", JSON.stringify(listProject));
      // Ẩn modal và reset biến
      document.querySelector("#modelDeleteTask").style.display = "none";
      taskIdToDelete = null;
    }
  };
  // Hủy bỏ xóa
  exits();
}

// validate các Input của newMember
const inputMemberEmail = document.querySelector("#memberEmailInput").value;
let inputMemberRole;
document
  .querySelector("#memberRoleInput")
  .addEventListener("change", function () {
    inputMemberRole = document.querySelector("#memberRoleInput").value;
  }); // Lấy ra vai trò của thành viên từ select Option

function validateNewMember() {
  const inputMemberEmail = document.querySelector("#memberEmailInput").value;
  console.log(inputMemberEmail);

  console.log(inputMemberRole);

  if (!inputMemberEmail || !inputMemberRole) {
    // Thông báo dữ liệu trống
    return 0;
  } else {
    return 1;
  }
}

// model Hàm thêm thành viên cho dự án
function addMember() {
  document.querySelector("#formAddMember").style.display = "block";
  // Lấy input vào
  document
    .querySelector("#saveAddMembertBtn")
    .addEventListener("click", function () {
      const inputMemberEmail = document
        .querySelector("#memberEmailInput")
        .value?.trim();
      console.log("validateNewMember(): ", validateNewMember());
      if (validateNewMember()) {
        console.log("input hợp lệ không trống", validateNewMember());
        resetModelMember();
        // Kiểm tra xem email có hợp lệ không
        if (
          !inputMemberEmail.includes("@") ||
          !inputMemberEmail.endsWith(
            ".com" || !inputMemberEmail.endsWith(".vn")
          )
        ) {
          // Email không hợp lệ
          document.querySelector("#errorMemberInfor").textContent = ``;
          document.querySelector(
            "#errorMemberEmail"
          ).textContent = `Email không hợp lệ`;
          document.querySelector("#memberEmailInput").style.borderColor = "red";
          document.querySelector("#memberRoleInput").style.borderColor =
            "#D0D5DD";
        } else {
          document.querySelector("#errorMemberEmail").textContent = ``;
          // email hợp lệ --> xét xem email cửa người dùng đó đã được đăng kí hay chưa
          const checkUserEmail = userAccounts.find(
            (user) => user.email === inputMemberEmail.trim()
          );
          console.log("email người dùng cần tìm: ", checkUserEmail);
          // tức là email nhập vào đó đã có tài khoản đăng nhập --> kiểm tra xem tài khoản đó đã được thêm vào danh sách thanh viên chưa
          if (checkUserEmail) {
            resetModelMember();
            // Email chưa tồn tại trong danh sách thành viên --> thêm
            console.log("memberList: ", memberList);
            const checkExistUser = memberList.find(
              (member) => member.email === checkUserEmail.email
            );
            if (!checkExistUser) {
              // email (hay người dùng) chưa có trong danh sách thành viên của dự án
              console.log(checkUserEmail.id);
              console.log(checkUserEmail.fullName);
              console.log(checkUserEmail.email);
              console.log(checkUserEmail.role);

              checkUserEmail.role = inputMemberRole;

              // Gán role cho người dùng
              // Gán role cho userAccount đã lấy ra
              // Tức là tên người dùng chưa tồn tại --> thêm mới
              let newMember = {
                id: checkUserEmail.id,
                fullName: checkUserEmail.fullName,
                email: checkUserEmail.email,
                role: checkUserEmail.role,
              };
              memberList.push(newMember);
              // listProject[taskIndex].member = memberList;
              console.log("Mảng thành viên sau khi thêm: ", memberList);
              console.log("checkUserEmail: ", checkUserEmail);
              localStorage.setItem("listProject", JSON.stringify(listProject));
              // Sau thêm và lưu vào local xong --> đóng form và reset các input
              document.querySelector("#formAddMember").style.display = "none";
              resetModelMember();
              document.querySelector("#memberEmailInput").value = "";
              document.querySelector("#memberRoleInput").value = 0;
            } else {
              // Email đã tồn tại --> thông báo
              document.querySelector(
                "#errorMemberEmail"
              ).textContent = `Thành viên đã tồn tại`;
              document.querySelector("#memberEmailInput").style.borderColor =
                "red";
            }
          } else {
            // Tức là email đó chưa có tài khoảng đăng nhập --> thông báo người dùng chưa được đăng kí
            document.querySelector(
              "#errorMemberInfor"
            ).textContent = `Người dùng chưa được đăng kí`;
          }
        }
      } else {
        console.log("input trống");
        // Thông báo dữ liệu trống
        document.querySelector(
          "#errorMemberInfor"
        ).textContent = `Thông tin không được để trống`;
        document.querySelector("#memberEmailInput").style.borderColor = "red";
        document.querySelector("#memberRoleInput").style.borderColor = "red";
      }
    });

  exits();
}

//
function exits() {
  // exits form AddEdit
  document.querySelector("#exitModelForm").onclick = function () {
    document.querySelector("#formAddEdit").style.display = "none";
    resetFormAddValue();
    resetFormAdd();
  };
  // Hủy thêm prj
  document.querySelector("#cancelAddEdit").onclick = function () {
    document.querySelector("#formAddEdit").style.display = "none";
    resetFormAddValue();
    resetFormAdd();
  };

  // khu vực của model thêm thành viên
  document
    .querySelector("#exitFormMember")
    .addEventListener("click", function () {
      document.querySelector("#formAddMember").style.display = "none";
      resetModelMember();
      document.querySelector("#memberEmailInput").value = "";
      document.querySelector("#memberRoleInput").value = 0;
    });
  document
    .querySelector("#cancelAddMember")
    .addEventListener("click", function () {
      document.querySelector("#formAddMember").style.display = "none";
      resetModelMember();
      document.querySelector("#memberEmailInput").value = "";
      document.querySelector("#memberRoleInput").value = 0;
    });
  // exits model xóa task
  document
    .querySelector("#cancelModelDelete")
    .addEventListener("click", function () {
      document.querySelector("#modelDeleteTask").style.display = "none";
    });
  document
    .querySelector("#iconExitModelDelete")
    .addEventListener("click", function () {
      document.querySelector("#modelDeleteTask").style.display = "none";
    });
}

// reset model add member
function resetModelMember() {
  document.querySelector("#errorMemberEmail").textContent = ``;
  document.querySelector("#errorMemberInfor").textContent = ``;
  document.querySelector("#memberEmailInput").style.borderColor = "#D0D5DD";
  document.querySelector("#memberRoleInput").style.borderColor = "#D0D5DD";
}

// Reset form add nhiệm vụ
function resetFormAddValue() {
  document.querySelector("#taskNameInput").value = "";
  document.querySelector("#taskStatus").value = 0;
  document.querySelector(".assignDate").value = "";
  document.querySelector(".deadline").value = "";
  document.querySelector(".priority").value = 0;
  document.querySelector(".progress").value = 0;
}
function resetFormAdd() {
  console.log("reset");
  document.querySelector("#taskNameError").textContent = "";
  document.querySelector("#assigneeError").textContent = "";
  document.querySelector("#taskStatusError").textContent = "";
  document.querySelector("#taskProgressError").textContent = "";
  document.querySelector("#assignDateError").textContent = "";
  document.querySelector("#deadlineError").textContent = "";
  document.querySelector("#priorityError").textContent = "";
  document.querySelector("#progressError").textContent = "";
  // reset border color của các ô input
  document.querySelector("#taskNameInput").style.borderColor = "#D0D5DD";
  document.querySelector("#assigneeInput").style.borderColor = "#D0D5DD";
  document.querySelector("#taskStatus").style.borderColor = "#D0D5DD";
  document.querySelector(".assignDate").style.borderColor = "#D0D5DD";
  document.querySelector(".deadline").style.borderColor = "#D0D5DD";
  document.querySelector(".priority").style.borderColor = "#D0D5DD";
  document.querySelector(".progress").style.borderColor = "#D0D5DD";
}

// Tạo màu trạng thái của thành viên
function randomBgColor() {
  const rColor = +Math.round(Math.random() * 255);
  const gColor = +Math.round(Math.random() * 255);
  const bColor = +Math.round(Math.random() * 255);
  console.log(`rgb(${rColor}, ${gColor}, ${bColor})`);
  return `rgb(${rColor}, ${gColor}, ${bColor})`;
}

// Hàm mở danh sách thành viên
function showMember() {
  document.querySelector("#modelListMember").style.display = "block";
  // render list member
  document.querySelector("#listMember").innerHTML = "";
  for (let i = 0; i < memberList.length; i++) {
    const tempName = memberList[i].fullName.split(" ");
    console.log(tempName);

    document.querySelector("#listMember").innerHTML += `<span id="inforMember">
              <div id="inforCol">
                <span id="AvtMember" style="background-color: ${randomBgColor()};">${tempName[0][0]
      }${tempName[tempName.length - 1][0]}</span>
                <div id="NameAndEmail">
                  <span id="NameMember">${memberList[i].fullName}</span>
                  <span id="EmailMember">${memberList[i].email}</span>
                </div>
              </div>
              <div id="roleCol">
                <input id=${memberList[i].id} class="roleOfMember" value="${memberList[i].role
      }" />
                <div><img id=${memberList[i].id
      } class="btn-delete-member" src="../icons/garbageBin.png"></div>
              </div>
            </span>`;
  }
  // exits model list member
  document.querySelector("#cancelModel").addEventListener("click", function () {
    document.querySelector("#modelListMember").style.display = "none";
    errorMemDel.textContent = "";
  });
  document.querySelector("#iconExitModelList").addEventListener("click", function () {
    document.querySelector("#modelListMember").style.display = "none";
    errorMemDel.textContent = "";
  });
}
// Hàm edit task
let taskIndexToEdit = null;
function editTask(id) {
  addEditStatus = "edit";
  resetFormAdd();
  console.log("Vị trí Task: ", id);
  taskIndexToEdit = taskList.findIndex((item) => item.taskId === id);
  console.log("Vị trí task cần sửa: ", taskIndexToEdit);
  console.log("task cần edit", taskList[taskIndexToEdit]);
  document.querySelector("#formAddEdit").style.display = "block";
  renderMemberListForm();

  const task = taskList[taskIndexToEdit];
  console.log(task.assignee);

  document.querySelector("#taskNameInput").value = task.taskName;
  console.log((task.assignee).fullName);

  document.querySelector("#assigneeInput").value = (task.assignee).fullName;
  document.querySelector("#taskStatus").value = task.taskStatus;
  document.querySelector(".assignDate").value = task.assignDate;
  document.querySelector(".deadline").value = task.dueDate;
  document.querySelector(".priority").value = task.priority;
  document.querySelector(".progress").value = task.progress;

  // Chỉ gọi sự kiện click nút save một lần duy nhất khi trang load
  document.querySelector(".saveAddEditBtn").onclick = function () {
    if (addEditStatus === "edit" && taskIndexToEdit !== null) {
      const tempTaskname = document.querySelector("#taskNameInput").value;
      const tempAssigneeId = memberList.find((member) => member.id == document.querySelector("#assigneeInput").value);
      console.log(tempAssigneeId);

      const tempStatus = document.querySelector("#taskStatus").value;
      const tempAssignDate = new Date(document.querySelector("#assignDate").value);
      const tempDueDate = new Date(document.querySelector(".deadline").value);
      const tempPriority = document.querySelector(".priority").value;
      const tempProgress = document.querySelector(".progress").value;
      const currentDay = new Date().getTime();

      countError = 0;
      // 1. Tên nhiệm vụ
      if (!tempTaskname) {
        // thông báo tên nhiệm vụ không được để trống
        document.querySelector("#taskNameError").textContent = "Tên nhiệm vụ không được để trống";
        document.querySelector("#taskNameInput").style.borderColor = "red";
        countError++;
      } else {
        // Check xem tên task này đã tồn tại hay chưa
        if (tempTaskname.length > 35) {
          document.querySelector("#taskNameError").textContent = "Độ dài tên nhiệm vụ không hợp lệ";
          document.querySelector("#taskNameInput").style.borderColor = "red";
          countError++;
        } else {
          // reset
          document.querySelector("#taskNameError").textContent = "";
          document.querySelector("#taskNameInput").style.borderColor = "#D0D5DD";
        }
      }
      // 2. người phụ trách
      if (!tempAssigneeId) {
        // Thông báo: người phụ trách không được để trống
        document.querySelector("#assigneeError").textContent = "Người phụ trách không được để trống";
        document.querySelector("#assigneeInput").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#assigneeError").textContent = "";
        document.querySelector("#assigneeInput").style.borderColor = "#D0D5DD";
      }
      // 3. Trạng thái task
      if (!tempStatus || tempStatus.value === 0) {
        // Thông báo trạng thái task không được để trống
        document.querySelector("#taskStatusError").textContent = "Trạng thái task không được để trống";
        document.querySelector("#taskStatus").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#taskStatusError").textContent = "";
        document.querySelector("#taskStatus").style.borderColor = "#D0D5DD";
      }
      // 4. Ngày bắt đầu
      const isAssignDateValid = !isNaN(tempAssignDate.getTime());
      const isTaskDeadlineValid = !isNaN(tempDueDate.getTime());
      // Kiểm tra xem time nhận vào có inValid không
      if (!isAssignDateValid) {
        // nếu ngày bắt đầu để trống--> Thông báo 
        document.querySelector("#assignDateError").textContent = "Ngày bắt đầu không để trống";
        document.querySelector(".assignDate").style.borderColor = "red";
        countError++;
      } else {
        if (tempAssignDate.getTime() <= currentDay) {
          // Ngày bắt đầu <= ngày hiện tại --> thông báo
          document.querySelector("#assignDateError").textContent = "Ngày bắt đầu phải lớn hơn ngày hiện tại";
          document.querySelector(".assignDate").style.borderColor = "red";
          countError++;
        } else {
          // reset
          document.querySelector("#assignDateError").textContent = "";
          document.querySelector(".assignDate").style.borderColor = "#D0D5DD";
        }
      }
      // 5. Hạn chót
      if (tempDueDate.getTime() < tempAssignDate.getTime() || !isTaskDeadlineValid) {
        // Nếu hạn chót nhỏ hơn ngày bắt đầu --> báo lỗi
        document.querySelector("#deadlineError").textContent = "Deadline không hợp lệ";
        document.querySelector(".deadline").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#deadlineError").textContent = "";
        document.querySelector(".deadline").style.borderColor = "#D0D5DD";
      }
      // 6. Độ ưu tiên
      if (!tempPriority || tempPriority.value == 0) {
        // Thông báo độ ưu tiên không được để trống
        document.querySelector("#priorityError").textContent = "Độ ưu tiên không được để trống";
        document.querySelector(".priority").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#priorityError").textContent = "";
        document.querySelector(".priority").style.borderColor = "#D0D5DD";
      }
      // 7. Tiến độ
      if (!tempProgress || tempProgress.value == 0) {
        // Thông báo tiến độ không được để trống
        document.querySelector("#progressError").textContent = "Tiến độ không được để trống";
        document.querySelector(".progress").style.borderColor = "red";
        countError++;
      } else {
        // reset
        document.querySelector("#progressError").textContent = "";
        document.querySelector(".progress").style.borderColor = "#D0D5DD";
      }
      //   Đếm số lỗi - số lỗi === 0 --> thêm mới task

      if (countError === 0) {
        const task = taskList[taskIndexToEdit];
        // validate dữ liệu nhận vào khi edit
        task.taskName = document.querySelector("#taskNameInput").value;
        const newTaskId = document.querySelector("#assigneeInput").value
        task.assignee = memberList.find((member) => member.id == newTaskId);
        console.log(task.assignee);

        task.taskStatus = document.querySelector("#taskStatus").value;
        task.assignDate = document.querySelector("#assignDate").value;
        task.dueDate = document.querySelector(".deadline").value;
        task.priority = document.querySelector(".priority").value;
        task.progress = document.querySelector(".progress").value;

        renderTaskList(taskList);
        localStorage.setItem("listProject", JSON.stringify(listProject));
        document.querySelector("#formAddEdit").style.display = "none";
        addEditStatus = "add";
        taskIndexToEdit = null;
        resetFormAddValue();
      }
    }
  };
  exits();
}

// search Task
// Lấy thông tin từ input tìm
const formSearchElement = document.querySelector("#searchPrjBox");
function searchTask() {
  // const
  const inputSearch = document.querySelector("#inputToSearch").value;
  console.log(inputSearch);
  const taskNeedSearch = taskList.filter((item) =>
    item.taskName.toLowerCase().includes(inputSearch.toLowerCase().trim())
  );
  console.log("Các task cần tìm: ", taskNeedSearch);
  renderTaskList(taskNeedSearch);
  if (!taskNeedSearch) {
    renderTaskList(taskList);
  }
}

let bodyModelElement = document.getElementById("bodyModel");
const btnSaveEdit = document.querySelector("#saveListModel");
const errorMemDel = document.querySelector("#errorMemberDel");
bodyModelElement.addEventListener("click", (e) => {
  // Xóa thành viên
  // gọi ra target có chứa class /"btn-delete-member"/
  if (e.target.classList.contains("btn-delete-member")) {
    let deleteId = Number(e.target.id);
    console.log(deleteId);
    console.log(projectOpen);

    const memberDelete = memberList.find((member) => member.id === deleteId);
    console.log("memberList trc khi xóa", memberList);

    console.log(memberDelete);
    if (memberDelete.role === "projectOwner") {
      errorMemDel.textContent = `Không thể xóa người phụ trách dự án`;
    } else {
      errorMemDel.textContent = "";
      const indexMemberDel = memberList.findIndex(
        (member) => member.id === deleteId
      );
      console.log("Vị trí cần xóa: ", indexMemberDel);
      memberList.splice(indexMemberDel, 1);
      showMember();
      console.log("memberList sau khi xóa", memberList);
    }
  }
  // Thay đổi role thành viên
  if (e.target.classList.contains("roleOfMember")) {
    let idToEdit = +e.target.id;
    const memberEditIndex = memberList.findIndex(
      (member) => member.id === idToEdit
    );
    if (memberList[memberEditIndex].role === "projectOwner") {
      e.target.setAttribute("disabled", true);
      document.querySelector("#errorMemberDel").textContent = `Không thể sửa vai trò của Project Owner`;
    } else {
      document.querySelector("#errorMemberDel").textContent = ``;
      btnSaveEdit.addEventListener("click", function () {
        let inputNewRole = e.target.value;
        console.log(inputNewRole);
        memberList[memberEditIndex].role = inputNewRole;
        localStorage.setItem("listProject", JSON.stringify(listProject));
        document.querySelector("#modelListMember").style.display = "none";
        inputNewRole = "";
      });

    }
  }
});

// Sắp xếp
const arrangeInputElement = document.querySelector("#arrangeInput");
const arrangeChoice = document.querySelector("#arrangeTasks");
console.log(arrangeChoice);
arrangeChoice.addEventListener("change", function () {
  console.log(arrangeChoice.value);
  console.log("taskList trc sắp xếp: ", taskList);
  if (arrangeChoice.value == 1) {
    const arrangeDeadline = taskList.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
    console.log("taskList sau sắp xếp: ", arrangeDeadline);
    renderTaskList(arrangeDeadline);
  } else if (arrangeChoice.value == 2) {
    // Sắp xếp theo độ ưu tiên
    const lowPriority = taskList.filter((task) => task.priority === "Thấp");
    const midPriority = taskList.filter(
      (task) => task.priority === "Trung Bình"
    );
    const highPriority = taskList.filter((task) => task.priority === "Cao");
    let arrangePriority = lowPriority.concat(midPriority).concat(highPriority);
    console.log(arrangePriority);
    renderTaskList(arrangePriority);
  } else {
    window.location.reload();
  }
});
