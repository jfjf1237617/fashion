function isVisible(element) {
    var getOffset = function (el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { y: _y, x: _x };
    }
    var _pos = getOffset(element);
    var _topElement = document.elementFromPoint(_pos.x, _pos.y);
    return String(_topElement == element);
}
export default isVisible;