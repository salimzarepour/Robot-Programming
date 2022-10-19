async function generateTable(event) {
    event.preventDefault();
    let roomwide = document.getElementById("inp_room_wide").value;
    let roomdeep = document.getElementById("inp_room_deep").value;
    let robotx = document.getElementById("inp_pos_x").value;
    let roboty = document.getElementById("inp_pos_y").value;
    let orientation = document.getElementById("inp_sel_or").value;
    let inp_search_commands = document.getElementById("inp_search_commands").value.toUpperCase();


    if (roomwide != '') {
        if (roomdeep != '') {
            if (robotx != '') {
                if (roboty != '') {
                    if (inp_search_commands != '') {

                        const errorlabel = document.getElementById('errorlabel');
                        errorlabel.innerHTML = '<span style="background-color: white">Thank you for using this application</span>';
                        for (var i = 0; i < inp_search_commands.length; i++) {
                            DrawTables(roomdeep, roomwide, robotx, roboty, orientation);
                            await sleep(3000);
                            switch (inp_search_commands.charAt(i)) {
                                case 'R':
                                    if (orientation == 'E') {
                                        orientation = 'S';
                                    }
                                    else if (orientation == 'N') {
                                        orientation = 'E';
                                    }
                                    else if (orientation == 'W') {
                                        orientation = 'N';
                                    }
                                    else if (orientation == 'S') {
                                        orientation = 'W';
                                    }
                                    break;
                                case 'L':
                                    if (orientation == 'E') {
                                        orientation = 'N';
                                    }
                                    else if (orientation == 'N') {
                                        orientation = 'W';
                                    }
                                    else if (orientation == 'W') {
                                        orientation = 'S';
                                    }
                                    else if (orientation == 'S') {
                                        orientation = 'E';
                                    }
                                    break;
                                case 'F':
                                    if (orientation == 'E') {
                                        robotx = Number(robotx) + 1;
                                        roboty = roboty;
                                    }
                                    else if (orientation == 'N') {
                                        robotx = robotx;
                                        roboty = Number(roboty) - 1;
                                    }
                                    else if (orientation == 'W') {
                                        robotx = Number(robotx) - 1;
                                        roboty = roboty;
                                    }
                                    else if (orientation == 'S') {
                                        robotx = robotx;
                                        roboty = Number(roboty) + 1;
                                    }
                                    break;
                            }
                        }
                        DrawTables(roomdeep, roomwide, robotx, roboty, orientation);
                        const Answerlabel = document.getElementById('Answerlabel');
                        Answerlabel.innerHTML = `<span style="font-weight: bold; font-size: x-large; color: white">The robot stay at column ${robotx} and row ${roboty} and orientation is ${orientation} </span>`;

                    }
                    else {
                        const errorlabel = document.getElementById('errorlabel');
                        errorlabel.innerHTML = '<span style="background-color: yellow">please insert your commands!</span>';

                    }
                }
                else {

                    const errorlabel = document.getElementById('errorlabel');
                    errorlabel.innerHTML = '<span style="background-color: yellow">please insert robot y position!</span>';
                }
            }
            else {

                const errorlabel = document.getElementById('errorlabel');
                errorlabel.innerHTML = '<span style="background-color: yellow">please insert robot x position!</span>';
            }
        }
        else {

            const errorlabel = document.getElementById('errorlabel');
            errorlabel.innerHTML = '<span style="background-color: yellow">please insert room deep!</span>';
        }
    }
    else {
        const errorlabel = document.getElementById('errorlabel');
        errorlabel.innerHTML = '<span style="background-color: yellow">please insert room wide!</span>';

    }
}

function DrawTables(roomdeep, roomwide, r_x, r_y, ort) {
    const tbl = document.getElementById("targettbl_id");
    if (r_x > roomdeep - 1 || r_y > roomwide - 1) {        
        const errorlabel = document.getElementById('errorlabel');
        errorlabel.innerHTML = '<span style="background-color: yellow">Robot went out of the room !!!!!</span>';
    }
    Get_Table_row_counts();
    const tblBody = document.createElement("tbody");
    for (let i = 0; i < roomdeep; i++) {

        const row = document.createElement("tr");
        row.style.border = "1px solid black";

        for (let j = 0; j < roomwide; j++) {
            const cell = document.createElement("td");
            cell.style.border = "1px solid black";
            const cellText = document.createTextNode(`row ${i}, column ${j}`);
            var img = document.createElement('img');
            if (j == r_x && i == r_y) {
                if (ort == 'N') {
                    img.src = 'https://i.postimg.cc/tsfZNN4M/Robot-N.png';
                }
                else if (ort == 'S') {
                    img.src = 'https://i.postimg.cc/CBpRWMDC/Robot-S.png';
                }
                else if (ort == 'E') {
                    img.src = 'https://i.postimg.cc/FzHgZDpT/Robot-E.png';
                }
                else if (ort == 'W') {
                    img.src = 'https://i.postimg.cc/N98KYh73/Robot-W.png';
                }
            }
            else {
                img.src = 'https://i.postimg.cc/tsKXSSQ8/EmtyCell.png';
            }
                img.width = "100";
                img.height = "100";
                cell.appendChild(cellText);
                cell.appendChild(img);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        tbl.setAttribute("border", "2");
    }

function Get_Table_row_counts() {

    const tbl = document.getElementById("targettbl_id");
    let totalRowCount = tbl.rows.length;
    for (let i = totalRowCount - 1; i >= 0; i--)
        document.getElementsByTagName("tr")[i].remove();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}