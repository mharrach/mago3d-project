//______________________________Handle the navigation tabs___________________________________//
function toggleVisibility() {
    var i, tabcontent, tablinks;
    var e = document.getElementById("navtab");
    if (e.style.display == 'block') {
        e.style.display = 'none';
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    } else {
        e.style.display = 'block';
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//________________________________Handle navigation buttons______________________________________//
const data_element = document.getElementById("data");
const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

var current_page = 1;
var rows = 10;

function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    var start = rows_per_page * page;
    var end = start + rows_per_page;
    var paginatedItems = items.slice(start, end);

    for (var i = 0; i < paginatedItems.length; i++) {
        var item = paginatedItems[i];
        var item_element = document.createElement('div');
        item_element.classList.add("item");
        item_element.id = item;
        item_element.innerText = items.length - items.indexOf(item) + " " + item;
        wrapper.appendChild(item_element);
    }
    SwitchOnOff(wrapper);
    MoveTo(wrapper);
}

function SwitchOnOff(wrapper) {
    var items = wrapper.children;
    var mago_manager = map.getMagoManager();
    for (let j = 0; j < items.length; j++) {
        const element = items[j];
        var onoff_btn = document.createElement('button');
        onoff_btn.innerText = "on/off";
        onoff_btn.classList.add('onoff');
        element.appendChild(onoff_btn);
        onoff_btn.addEventListener('click', function() {
            var btns_list = document.getElementsByClassName("onoff");
            for (let i = 0; i < btns_list.length; i++) {
                const ele = btns_list[i];
                ele.classList.remove("active");
            }
            this.classList.add("active");
            var node = mago_manager.hierarchyManager.getNodeByDataKey(1, element.id);
            if (node.data.attributes.isVisible == true) {
                node.data.attributes.isVisible = false;
            } else {
                node.data.attributes.isVisible = true;
            }
        })
    }
}

function MoveTo(wrapper) {
    var items = wrapper.children;
    for (let j = 0; j < items.length; j++) {
        const element = items[j];
        var move_btn = document.createElement('button');
        move_btn.innerText = "Move to";
        move_btn.classList.add('move');
        element.appendChild(move_btn);
        move_btn.addEventListener('click', function() {
            var btns_list = document.getElementsByClassName("move");
            for (let i = 0; i < btns_list.length; i++) {
                const ele = btns_list[i];
                ele.classList.remove("active");
            }
            this.classList.add("active");
            searchDataAPI(map, 1, element.id);
        })
    }
}

function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    var page_count = Math.ceil(items.length / rows_per_page);
    var first = PaginationButton("first", items, rows_per_page);
    wrapper.appendChild(first);
    first.classList.add("first");

    var prev_btn = PaginationButton("prev", items, rows_per_page);
    wrapper.appendChild(prev_btn);
    prev_btn.classList.add("prev");

    for (var i = 1; i <= page_count; i++) {
        var btn = PaginationButton(i, items, rows_per_page);
        wrapper.appendChild(btn);

        if (i >= 5) {
            var etc_btn = PaginationButton("...", items, rows_per_page);
            wrapper.appendChild(etc_btn);
            var end_btn = PaginationButton(page_count, items, rows_per_page);
            wrapper.appendChild(end_btn);
            break;
        }
    }

    var next_btn = PaginationButton("next", items, rows_per_page);
    wrapper.appendChild(next_btn);
    next_btn.classList.add("next");

    var last = PaginationButton("last", items, rows_per_page);
    wrapper.appendChild(last);
    last.classList.add("last");
}

function PaginationButton(page, items, rows_per_page) {

    var button = document.createElement("button");
    button.innerText = page;

    var first_btn = document.querySelector('.pagenumbers button.first');
    var prev_btn = document.querySelector('.pagenumbers button.prev');

    if (current_page == page) {
        button.classList.add("active");
        first_btn.style.visibility = "hidden";
        prev_btn.style.visibility = "hidden";
    }

    button.addEventListener('click', function() {
        PageTester(page, items, rows_per_page);
        DisplayList(items, list_element, rows, current_page);

        var current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove("active");

        button.classList.add("active");
        button.style.visibility = "visible";
    })

    return button;
}

function PageTester(page, items, rows_per_page) {
    var page_count = Math.ceil(items.length / rows_per_page);

    var btn_list = document.getElementsByTagName("button");

    var first_btn = document.querySelector('.pagenumbers button.first');
    first_btn.style.visibility = "visible";

    var prev_btn = document.querySelector('.pagenumbers button.prev');
    prev_btn.style.visibility = "visible";

    var next_btn = document.querySelector('.pagenumbers button.next');
    next_btn.style.visibility = "visible";

    var last_btn = document.querySelector('.pagenumbers button.last');
    last_btn.style.visibility = "visible";

    if (page == "prev" && current_page == 1) {
        current_page = page_count;
    } else if (page == "prev") {
        current_page--;
        for (let index = 0; index < btn_list.length; index++) {
            const element = btn_list[index];
            if (element.innerText == current_page) {
                element.focus();
            }
        }
    } else if (page == "next" && current_page == page_count) {
        current_page = 1;
    } else if (page == "next") {
        current_page++;
        for (let index = 0; index < btn_list.length; index++) {
            const element = btn_list[index];
            if (element.innerText == current_page) {
                element.focus();
            }
        }
    } else if (page == "first") {
        current_page = 1;
    } else if (page == "last") {
        current_page = page_count;
    } else if (page == 1) {
        current_page = page;
        first_btn.style.visibility = "hidden";
        prev_btn.style.visibility = "hidden";
    } else if (page == page_count) {
        current_page = page_count;
        next_btn.style.visibility = "hidden";
        last_btn.style.visibility = "hidden";
    } else {
        current_page = page;
    }
}

function SetupSearchBox(wrapper, items) {
    var search_box = document.createElement("div");
    search_box.classList.add("searchbox");
    var input = document.createElement("input");
    input.setAttribute("placeholder", "Search...");
    search_box.appendChild(input);
    var search_button = document.createElement("button");
    search_button.id = "search";
    search_button.innerText = "Search";
    search_button.addEventListener('click', function() {
        reset_button.classList.remove("active");
        search_button.classList.add("active");
        var input_value = input.value.toLowerCase();
        var result = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            const condition = element.toLowerCase().includes(input_value);
            if (condition) {
                result.push(element);
            } else if (i == items.length - 1 && result.length == 0) {
                list_element.innerHTML = "element not found!";
                pagination_element.innerHTML = "";
            }
        }
        if (result.length != 0) {
            DisplayList(result, list_element, rows, current_page);
            SetupPagination(result, pagination_element, rows);
        }
    });
    search_box.appendChild(search_button);
    var reset_button = document.createElement("button");
    reset_button.id = "reset";
    reset_button.innerText = "Reset";
    reset_button.addEventListener('click', function() {
        search_button.classList.remove("active");
        reset_button.classList.add("active");
        input.value = "";
        DisplayList(datalist, list_element, rows, current_page);
        SetupPagination(datalist, pagination_element, rows);
    });
    search_box.appendChild(reset_button);
    wrapper.appendChild(search_box);
}


//_____________________________Add map and json data________________________________//
var geopolicy = {};
geopolicy.basicGlobe = 'cesium';
geopolicy.terrainType = 'cesium-ion-default';
geopolicy.initCameraEnable = true;
geopolicy.initLatitude = 35.139482;
geopolicy.initLongitude = 128.917656;
geopolicy.initAltitude = 500;
geopolicy.initDuration = 0.5;

var map = new Mago3D.Mago3d('map', geopolicy);

var f4dController = map.getF4dController();

var f4dGroup = {
    "metainfo": {
        "isPhysical": false
    },
    "dataGroupId": 1,
    "dataGroupKey": "guide",
    "dataGroupName": "가이드 데이터 그룹",
    "dataGroupPath": "guide",
    "datas": []
};

var elementObject = {
    "metainfo": {
        "isPhysical": true,
        "flipYTexCoords": false,
        "heightReference": "clampToGround",
        "isVisible": true
    },
    "dataId": 1,
    "dataGroupId": 1,
    "dataKey": 'default',
    "dataName": 'default',
    "mappingType": "boundingboxcenter",
    "longitude": 128.917656,
    "latitude": 35.139482,
    "height": 14.177629,
    "heading": 0.000000,
    "pitch": 0.000000,
    "roll": 0.000000
};

function loadJSON(callback, pathToJson) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', pathToJson, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var path = 'f4d/guide/mergedLonsLats.json';
var datalist = [];

loadJSON(function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    for (var i = 0; i < actual_JSON.length; i++) {
        var newElementObject = JSON.parse(JSON.stringify(elementObject));
        newElementObject.dataKey = actual_JSON[i].data_key;
        newElementObject.dataKey = actual_JSON[i].data_key;
        newElementObject.longitude = actual_JSON[i].longitude;
        newElementObject.latitude = actual_JSON[i].latitude;
        newElementObject.dataId += i;
        f4dGroup.datas.push(newElementObject);
        f4dController.addF4dGroup(f4dGroup);
        datalist.push(actual_JSON[i].data_key);
    }
    DisplayList(datalist, list_element, rows, current_page);
    SetupPagination(datalist, pagination_element, rows);
    SetupSearchBox(data_element, datalist);
}, path);