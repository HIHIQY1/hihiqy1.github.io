function elementMouseEnter(e) {
    e.currentTarget.classList.add("hover");
}
function elementMouseLeave(e) {
    e.currentTarget.classList.remove("hover");
    elementMouseUp(e);
}
function elementMouseDown(e) {
    e.currentTarget.classList.add("active");
}
function elementMouseUp(e) {
    e.currentTarget.classList.remove("active");
}
function handleEventClasses(e) {
    e.addEventListener((isTouch() ? "touchstart" : "mouseenter"), elementMouseEnter);
    e.addEventListener((isTouch() ? "touchend" : "mouseleave"), elementMouseLeave);
    e.addEventListener((isTouch() ? "touchstart" : "mousedown"), elementMouseDown);
    e.addEventListener((isTouch() ? "touchend" : "mouseup"), elementMouseUp);
}