import {endpointURL} from "./params.js"
//import { STORE } from "./store.js";
import $ from "jquery";
import cuid from 'cuid';
import {generateButton} from "./generateForm.js";
import {clearBookmarkList} from "./index.js"

export let loadBookMarks = () => {
    console.log(endpointURL)
    fetch(endpointURL, { method: 'GET'})
    .then(res => res.json())
    .then(STORE => 
        {
            console.log(STORE);

            STORE.forEach((bookmark)=> {
                $("#bookmarkList ul").append(
                    `<div id="${bookmark.id}" data-id=${cuid()}><li><h2>${bookmark.title}<h2></li>
                    <li><i>${bookmark.url}</i></li>
                    <li><p>${bookmark.description}</p></li>
                    <li>${generateButton("Remove", "remove", bookmark.id)}${generateButton("Edit", "edit", bookmark.id)}</li></div>`
                )
                $(`#remove${bookmark.id}`).click((evt)=>{
                    const id = $(event.currentTarget).attr('data-id');
                    //$("div[id="+id+"]").remove();
                    deleteBookmark(id);
                    clearBookmarkList();
                    setTimeout(()=>{
                        loadBookMarks();
                    }, 700)
                })
                $(`#edit${bookmark.id}`).click(()=>{
                    let currentBookmark = STORE.find((b)=>b.id == bookmark.id);
                    let objectParsed = JSON.parse(JSON.stringify(currentBookmark));
                    $("#bookmarkTitle").val(objectParsed.title);
                    $("#urlDescription").val(objectParsed.url);
                    $("#editBookmarkdefault").removeClass("hideEditbutton").addClass("revealEditbutton");
                    $("#editBookmarkdefault").click(()=>{
                        const object = {
                            title: $("#bookmarkTitle").val(),
                            url: $("#urlDescription").val(),
                         }
                        editBookmark(bookmark.id, object)
                    })
                    
                    console.log("You clicked edit!" +  objectParsed);
                })
            });
        });
}

export let addBookmark = (bookmark) => {

    fetch(endpointURL, {
        method: 'post',
        body:    JSON.stringify(bookmark),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => 
        {
            console.log(json);
            $("#msgInfo").html("Bookmark added")
        });
}

export let deleteBookmark = (id) => {

    fetch(endpointURL+"/"+id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => 
        {
            $("#msgInfo").html("Bookmark deleted")
        });
}

export let editBookmark = (id, bookmark) => {

    fetch(endpointURL+"/"+id, {
        method: 'patch',
        body:    JSON.stringify(bookmark),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => 
        {
            console.log(json);
            $("#msgInfo").html("Bookmark edited")
        });

}