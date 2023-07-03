window.addEventListener("load", function () {
    let currentYear;
    let currentMonth;

    function createCalendar(year, month) {
        const calendar = document.getElementById("calendar");

        const date = new Date();
        currentYear = year || date.getFullYear();
        currentMonth = month || date.getMonth();

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        const monthCell = document.createElement("th");
        monthCell.colSpan = 7;
        monthCell.textContent = monthNames[currentMonth] + " " + currentYear;
        headerRow.appendChild(monthCell);

        const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
        const daysRow = document.createElement("tr");
        for (let i = 0; i < daysOfWeek.length; i++) {
            const dayCell = document.createElement("th");
            dayCell.textContent = daysOfWeek[i];
            daysRow.appendChild(dayCell);
        }

        thead.appendChild(headerRow);
        thead.appendChild(daysRow);
        table.classList.add('table');
        table.classList.add('table-bordered');
        table.appendChild(thead);
        table.appendChild(tbody);

        let dateCount = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayIndex) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                } else if (dateCount > daysInMonth) {
                    break;
                } else {
                    const cell = document.createElement("td");

                    var dataString = dateCount + '/' + (currentMonth + 1) + '/' + currentYear;
                    var dataParts = dataString.split("/");
                    var dia = dataParts[0];
                    var mes = dataParts[1];
                    var ano = dataParts[2];
                    var data = ano + "-" + mes.padStart(2, "0") + "-" + dia.padStart(2, "0");

                    var evento = "document.getElementById('vVCALENDARIO').setAttribute('value', '" + data + "');";

                    var hoje = new Date();
                    hojeString = hoje.getDate() + "/" + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();

                    cell.innerHTML = '<a onclick="' + evento + '">' + dateCount + '</a>';
                    cell.style.backgroundColor = '#f5f5f5';

                    if (dataString == hojeString) {
                        // console.log('dataString: ' + dataString);
                        // console.log('hojeString: ' + hojeString);
                        cell.classList.add('ativo');
                    }

                    row.appendChild(cell);
                    dateCount++;
                }
            }
            tbody.appendChild(row);
        }

        calendar.innerHTML = "";
        calendar.appendChild(table);

        // Selecionar a data ao clicar na âncora
        const anchors = document.querySelectorAll("#calendar table tbody a");

        anchors.forEach(function (anchor) {
            anchor.addEventListener("click", function () {
                // Remove a classe "ativo" de todas as âncoras
                anchors.forEach(function (a) {
                    a.parentElement.classList.remove("ativo");
                });

                // Adiciona a classe "ativo" à célula pai da âncora clicada
                this.parentElement.classList.add("ativo");
            });
        });
    }

    function showPreviousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentYear--;
            currentMonth = 11;
        }
        createCalendar(currentYear, currentMonth);
    }

    function showNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentYear++;
            currentMonth = 0;
        }
        createCalendar(currentYear, currentMonth);
    }

    document.getElementById("previousButton").addEventListener("click", showPreviousMonth);
    document.getElementById("nextButton").addEventListener("click", showNextMonth);

    createCalendar();
});