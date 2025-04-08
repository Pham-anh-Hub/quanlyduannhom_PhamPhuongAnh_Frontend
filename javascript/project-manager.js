// kiểm tra trạng thái đăng nhập
const userAccounts = JSON.parse(localStorage.getItem("userAccounts"));
const alreadyLogIn = JSON.parse(localStorage.getItem("alreadyLogIn"));
const listProject = JSON.parse(localStorage.getItem("listProject"));

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

// Kiểm tra xem đã có tài khoản nào được đăng kí chưa
// if (userAccounts.length === 0) {
//   // Chưa có --> đăng kí
//   window.location.href = "register.html";
// } else {
if (alreadyLogIn) {
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

  renderTaskList();

  document.querySelector("#logOut").addEventListener("click", function () {
    localStorage.setItem("alreadyLogIn", JSON.stringify(false));
    localStorage.setItem("userLoging", JSON.stringify(""));
  });
} else {
  // Mời đăng nhập
  window.location.href = "logIn.html";
}
// }

// Hàm render taskListtaskList
function renderTaskList() {
  let todoTaskList = taskList.filter((task) => task.taskStatus === "To do");
  console.log(todoTaskList);
  let inprogressTaskList = taskList.filter(
    (task) => task.taskStatus === "In Progress"
  );
  console.log(inprogressTaskList);
  let pendingTaskList = taskList.filter(
    (task) => task.taskStatus === "Pending"
  );
  console.log(pendingTaskList);
  let doneTaskList = taskList.filter((task) => task.taskStatus === "Done");
  console.log(doneTaskList);

  // render todoTask
  document.querySelector("#todoListContent").innerHTML = ""; // reset nội dung của todoTask
  for (let i = 0; i < todoTaskList.length; i++) {
    document.querySelector(
      "#todoListContent"
    ).innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần todoList  -->
                                                            <div id="taskName">${
                                                              todoTaskList[i]
                                                                .taskName
                                                            }</div>
                                                            <div id="projectMember">${
                                                              todoTaskList[i]
                                                                .assignee
                                                            }</div>
                                                            <div id="Priority"><span id=${
                                                              todoTaskList[i]
                                                                .priority ===
                                                              "Thấp"
                                                                ? "lowPriority"
                                                                : todoTaskList[
                                                                    i
                                                                  ].priority ===
                                                                  "Cao"
                                                                ? "highPriority"
                                                                : "mediumPriority"
                                                            }>${
      todoTaskList[i].priority
    }</span></div>
                                                            <div id="startDate">${todoTaskList[
                                                              i
                                                            ].assignDate
                                                              .split("-")
                                                              .join(
                                                                " - "
                                                              )}</div>
                                                            <div id="deadLine">${todoTaskList[
                                                              i
                                                            ].dueDate
                                                              .split("-")
                                                              .join(
                                                                " - "
                                                              )}</div>
                                                            <div id="Progress"><span id= ${
                                                              todoTaskList[i]
                                                                .progress ===
                                                              "Đúng tiến độ"
                                                                ? "on-schedule"
                                                                : todoTaskList[
                                                                    i
                                                                  ].progress ===
                                                                  "Có Rủi Ro"
                                                                ? "risk-schedule"
                                                                : "off-schedule"
                                                            }>${
      todoTaskList[i].progress
    }</span></div>
                                                            <div id="actionToTask">
                                                                <span><button id="editBtn" onclick="editTask(${i})">Sửa</button></span>
                                                                    <span><button id="deleteBtn" onclick="deleteTask(${i})">Xóa</button></span>
                                                            </div>
                                                        </div>`;
  }
  // render inprogress Task
  document.querySelector("#inProgressListContent").innerHTML = ""; // reset nội dung của inprogressTask
  for (let i = 0; i < inprogressTaskList.length; i++) {
    document.querySelector(
      "#inProgressListContent"
    ).innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần todoList  -->
                                                                <div id="taskName">${
                                                                  inprogressTaskList[
                                                                    i
                                                                  ].taskName
                                                                }</div>
                                                                <div id="projectMember">${
                                                                  inprogressTaskList[
                                                                    i
                                                                  ].assignee
                                                                }</div>
                                                                <div id="Priority"><span id=${
                                                                  inprogressTaskList[
                                                                    i
                                                                  ].priority ===
                                                                  "Thấp"
                                                                    ? "lowPriority"
                                                                    : inprogressTaskList[
                                                                        i
                                                                      ]
                                                                        .priority ===
                                                                      "Cao"
                                                                    ? "highPriority"
                                                                    : "mediumPriority"
                                                                }>${
      inprogressTaskList[i].priority
    }</span></div>
                                                                <div id="startDate">${inprogressTaskList[
                                                                  i
                                                                ].assignDate
                                                                  .split("-")
                                                                  .join(
                                                                    " - "
                                                                  )}</div>
                                                                <div id="deadLine">${inprogressTaskList[
                                                                  i
                                                                ].dueDate
                                                                  .split("-")
                                                                  .join(
                                                                    " - "
                                                                  )}</div>
                                                                <div id="Progress"><span id= ${
                                                                  inprogressTaskList[
                                                                    i
                                                                  ].progress ===
                                                                  "Đúng tiến độ"
                                                                    ? "on-schedule"
                                                                    : inprogressTaskList[
                                                                        i
                                                                      ]
                                                                        .progress ===
                                                                      "Có Rủi Ro"
                                                                    ? "risk-schedule"
                                                                    : "off-schedule"
                                                                }>${
      inprogressTaskList[i].progress
    }</span></div>
                                                                <div id="actionToTask">
                                                                    <span><button id="editBtn" onclick="editTask(${i})">Sửa</button></span>
                                                                        <span><button id="deleteBtn" onclick="deleteTask(${i})">Xóa</button></span>
                                                                </div>
                                                            </div>`;
  }
  // render pending Task
  document.querySelector("#pendingListContent").innerHTML = ""; // reset nội dung của pendingTask
  for (let i = 0; i < pendingTaskList.length; i++) {
    document.querySelector(
      "#pendingListContent"
    ).innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần todoList  -->
                                                                <div id="taskName">${
                                                                  pendingTaskList[
                                                                    i
                                                                  ].taskName
                                                                }</div>
                                                                <div id="projectMember">${
                                                                  pendingTaskList[
                                                                    i
                                                                  ].assignee
                                                                }</div>
                                                                <div id="Priority"><span id=${
                                                                  pendingTaskList[
                                                                    i
                                                                  ].priority ===
                                                                  "Thấp"
                                                                    ? "lowPriority"
                                                                    : pendingTaskList[
                                                                        i
                                                                      ]
                                                                        .priority ===
                                                                      "Cao"
                                                                    ? "highPriority"
                                                                    : "mediumPriority"
                                                                }>${
      pendingTaskList[i].priority
    }</span></div>
                                                                <div id="startDate">${pendingTaskList[
                                                                  i
                                                                ].assignDate
                                                                  .split("-")
                                                                  .join(
                                                                    " - "
                                                                  )}</div>
                                                                <div id="deadLine">${pendingTaskList[
                                                                  i
                                                                ].dueDate
                                                                  .split("-")
                                                                  .join(
                                                                    " - "
                                                                  )}</div>
                                                                <div id="Progress"><span id= ${
                                                                  pendingTaskList[
                                                                    i
                                                                  ].progress ===
                                                                  "Đúng tiến độ"
                                                                    ? "on-schedule"
                                                                    : pendingTaskList[
                                                                        i
                                                                      ]
                                                                        .progress ===
                                                                      "Có Rủi Ro"
                                                                    ? "risk-schedule"
                                                                    : "off-schedule"
                                                                }>${
      pendingTaskList[i].progress
    }</span></div>
                                                                <div id="actionToTask">
                                                                    <span><button id="editBtn" onclick="editTask(${i})">Sửa</button></span>
                                                                        <span><button id="deleteBtn" onclick="deleteTask(${i})">Xóa</button></span>
                                                                </div>
                                                            </div>`;
  }
  // render done Task
  document.querySelector("#doneListContent").innerHTML = ""; // reset nội dung của doneTask
  for (let i = 0; i < doneTaskList.length; i++) {
    document.querySelector(
      "#doneListContent"
    ).innerHTML += `<div id="taskRow"> <!-- Giới hạn nội dung mỗi dòng phần todoList  -->
                                                                <div id="taskName">${
                                                                  doneTaskList[
                                                                    i
                                                                  ].taskName
                                                                }</div>
                                                                <div id="projectMember">${
                                                                  doneTaskList[
                                                                    i
                                                                  ].assignee
                                                                }</div>
                                                                <div id="Priority"><span id=${
                                                                  doneTaskList[
                                                                    i
                                                                  ].priority ===
                                                                  "Thấp"
                                                                    ? "lowPriority"
                                                                    : doneTaskList[
                                                                        i
                                                                      ]
                                                                        .priority ===
                                                                      "Cao"
                                                                    ? "highPriority"
                                                                    : "mediumPriority"
                                                                }>${
      doneTaskList[i].priority
    }</span></div>
                                                                <div id="startDate">${doneTaskList[
                                                                  i
                                                                ].assignDate
                                                                  .split("-")
                                                                  .join(
                                                                    " - "
                                                                  )}</div>
                                                                <div id="deadLine">${doneTaskList[
                                                                  i
                                                                ].dueDate
                                                                  .split("-")
                                                                  .join(
                                                                    " - "
                                                                  )}</div>
                                                                <div id="Progress"><span id= ${
                                                                  doneTaskList[
                                                                    i
                                                                  ].progress ===
                                                                  "Đúng tiến độ"
                                                                    ? "on-schedule"
                                                                    : doneTaskList[
                                                                        i
                                                                      ]
                                                                        .progress ===
                                                                      "Có Rủi Ro"
                                                                    ? "risk-schedule"
                                                                    : "off-schedule"
                                                                }>${
      doneTaskList[i].progress
    }</span></div>
                                                                <div id="actionToTask">
                                                                    <span><button id="editBtn" onclick="editTask(${i})">Sửa</button></span>
                                                                        <span><button id="deleteBtn" onclick="deleteTask(${i})">Xóa</button></span>
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
  document
    .querySelector("#assigneeInput")
    .addEventListener("change", function () {
      taskAssigneeInput = document.querySelector("#assigneeInput").value.trim();
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
  document
    .querySelector("#saveAddEditBtn")
    .addEventListener("click", function () {
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

      // Đã lấy ra được ngày hiện tại
      // Validate lần lượt mỗi input
      countError = 0;
      // 1. Tên nhiệm vụ
      if (!taskNameInput) {
        // thông báo tên nhiệm vụ không được để trống
        console.log("tên nhiệm vụ không được để trống");
        document.querySelector("#taskNameError").textContent =
          "tên nhiệm vụ không được để trống";
        document.querySelector("#taskNameInput").style.borderColor = "red";
        countError++;
      } else {
        // Check xem tên task này đã tồn tại hay chưa
        const checkTaskExist = taskList.find(
          (task) => task.taskName === taskNameInput
        );
        if (checkTaskExist) {
          document.querySelector("#taskNameError").textContent =
            "tên nhiệm vụ đã tồn tại ";
          document.querySelector("#taskNameInput").style.borderColor = "red";
          countError++;
        } else {
          // reset
          resetFormAdd();
        }
      }
      // 2. người phụ trách
      if (!taskAssigneeInput) {
        // Thông báo: người phụ trách không được để trống
        console.log("người phụ trách không được để trống");
        document.querySelector("#assigneeError").textContent =
          "người phụ trách không được để trống";
        document.querySelector("#assigneeInput").style.borderColor = "red";
        countError++;
      } else {
        // reset
        resetFormAdd();
      }
      // 3. Trạng thái task
      if (!taskStatusInput) {
        // Thông báo trạng thái task không được để trống
        console.log("trạng thái task không được để trống");
        document.querySelector("#taskStatusError").textContent =
          "trạng thái task không được để trống";
        document.querySelector("#taskStatus").style.borderColor = "red";
        countError++;
      } else {
        // reset
        resetFormAdd();
      }
      // 4. Ngày bắt đầu

      const isAssignDateValid = !isNaN(assignDate.getTime());
      const isTaskDeadlineValid = !isNaN(taskDeadline.getTime());
      // Kiểm tra xem time nhận vào có inValid không
      if (assignDate.getTime() < currentDay || !isAssignDateValid) {
        // nếu ngày bắt đầu lớn hơn ngày hiện tại --> Thông báo không hợp lệ
        console.log(assignDate.getTime() < currentDay);
        console.log(assignDate.getTime());

        document.querySelector("#assignDateError").textContent =
          "ngày bắt đầu không hợp lệ";
        document.querySelector(".assignDate").style.borderColor = "red";
        countError++;
      } else {
        // reset
        resetFormAdd();
      }
      // 5. Hạn chót
      if (
        taskDeadline.getTime() < assignDate.getTime() ||
        !isTaskDeadlineValid
      ) {
        // Nếu hạn chót nhỏ hơn ngày bắt đầu --> báo lỗi
        console.log("Deadline không hợp lệ");
        console.log("taskDeadline ", taskDeadline.getTime());
        console.log("assignDate", assignDate.getTime());
        document.querySelector("#deadlineError").textContent =
          "Deadline không hợp lệ";
        document.querySelector(".deadline").style.borderColor = "red";
        countError++;
      } else {
        // reset
        resetFormAdd();
      }
      // 6. Độ ưu tiên
      if (!taskPriority) {
        // Thông báo độ ưu tiên không được để trống
        console.log("độ ưu tiên không được để trống");
        document.querySelector("#priorityError").textContent =
          "độ ưu tiên không được để trống";
        document.querySelector(".priority").style.borderColor = "red";
        countError++;
      } else {
        // reset
        resetFormAdd();
      }
      // 7. Tiến độ
      if (!taskProgress) {
        // Thông báo tiến độ không được để trống
        console.log("tiến độ không được để trống");
        document.querySelector("#progressError").textContent =
          "tiến độ không được để trống";
        document.querySelector(".progress").style.borderColor = "red";
        countError++;
      } else {
        // reset
        resetFormAdd();
      }

      //   Đếm số lỗi - số lỗi === 0 --> thêm mới task
      if (countError === 0) {
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
        console.log("newTask: ", newTask);
        taskList.push(newTask);
        console.log(taskList);
        localStorage.setItem("listProject", JSON.stringify(listProject));
        renderTaskList();
        document.querySelector("#formAddEdit").style.display = "none";
        resetFormAddValue();
      }
    });
}

// Hàm thêm nhiệm vụ
function addTaskToProject() {
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
    ).innerHTML += `<option value="${memberList[i].fullName}">${memberList[i].fullName}</option>`;
  }
}

// Hàm xóa nhiệm vụ
function deleteTask(index) {
  console.log("task cần xóa: ", taskList[index]);
  document.querySelector("#modelDeleteTask").style.display = "block";
  // Xác nhận xóaxóa
  document
    .querySelector("#confirmModelDelete")
    .addEventListener("click", function () {
      taskList.splice(index, 1);
      console.log("taskList sau khi xóa: ", taskList);
      renderTaskList();
      localStorage.setItem("listProject", JSON.stringify(listProject));
      document.querySelector("#modelDeleteTask").style.display = "none";
    });
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
  document
    .querySelector("#exitModelForm")
    .addEventListener("click", function () {
      document.querySelector("#formAddEdit").style.display = "none";
      resetFormAddValue();
      resetFormAdd();
    });

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

// reset form add task
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

// Hàm mở danh sách thành viên
function showMember() {
  document.querySelector("#modelListMember").style.display = "block";
  // render list member
  document.querySelector("#listMember").innerHTML = "";
  for (let i = 0; i < memberList.length; i++) {
    document.querySelector("#listMember").innerHTML += `<span id="inforMember">
              <div id="inforCol">
                <div id="NameAndEmail">
                  <span id="NameMember">${memberList[i].fullName}</span>
                  <span id="EmailMember">${memberList[i].email}</span>
                </div>
              </div>
              <div id="roleCol">
                <div id="roleOfMember">${memberList[i].role}</div>
                <div onclick="deleteMember(${i})"><img src="../icons/garbageBin.png"></div>
              </div>
            </span>`;
  }
  // exits model list member
  document.querySelector("#cancelModel").addEventListener("click", function () {
    document.querySelector("#modelListMember").style.display = "none";
  });
  document
    .querySelector("#iconExitModelList")
    .addEventListener("click", function () {
      document.querySelector("#modelListMember").style.display = "none";
    });
}
