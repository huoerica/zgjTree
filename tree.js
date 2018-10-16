(function ($) {
    var defaults = {
        data: [{id: null, orgName: '', orgType: '', parentId: null}],
        width: "200",
        height: '400',
        icons: [], //自定义图标
        defaultIcon: '', //默认显示图标
        openId: 142,
        selectedId: null
    };
    $.fn.extend({
        initTree: function (options) {
            _this = this;
            _this.html("");
            options = $.extend({}, defaults, options);
            if (options.data && options.data.length > 0) {
                var root = $('<ul id="zgj-tree-ul-0" class="zgj-tree"></ul>');
                _this.append(root);
                $.each(options.data, function (index, element) {
                    var nodeId = element.id ? element.id : 0;
                    var nodeType = element.orgType ? parseInt(element.orgType) : 0;
                    var nodeName = element.orgName ? element.orgName : '';
                    var parentId = element.parentId ? element.parentId : 0;
                    var node;
                    if (options.icons && options.icons.length > nodeType) {
                        node = $('<li id="zgj-tree-' + nodeId + '" class="zgj-tree-type-' + nodeType + '" hidefocus="close"><span class="toggle-icon"></span><a id="zgj-tree-a-' + nodeId + '"><img src="' + options.icons[nodeType] + '" />' + nodeName + '</a></li>');
                    } else if (options.defaultIcon != null && options.defaultIcon != '') {
                        node = $('<li id="zgj-tree-' + nodeId + '" class="zgj-tree-type-' + nodeType + '" hidefocus="close"><span class="toggle-icon"></span><a id="zgj-tree-a-' + nodeId + '"><img src="' + options.defaultIcon + '" />' + nodeName + '</a></li>');
                    } else {
                        node = $('<li id="zgj-tree-' + nodeId + '" class="zgj-tree-type-' + nodeType + '" hidefocus="close"><span class="toggle-icon"></span><a id="zgj-tree-a-' + nodeId + '">' + nodeName + '</a></li>');
                    }
                    if (parentId) {
                        //父级节点对应的li
                        var parentNode = $("#zgj-tree-" + parentId);
                        //当前li节点对应的ul
                        var parentUl = $('#zgj-ul-' + nodeType + '-' + parentId);
                        if (parentNode) {
                            var parentType = $("#zgj-tree-" + parentId).attr("class").split("-")[3];
                            //若当前orgtype >= parentType, 需新增UL来存储当前节点
                            if (parentType <= nodeType) {
                                parentUl = $('<ul id="zgj-ul-' + nodeType + '-' + parentId + '" class="zgj-tree-level-' + nodeType + '"></ul>');
                                parentUl.append(node);
                                parentNode.append(parentUl);
                            } else if (parentType > nodeType) {
                                if (!parentUl.length) {
                                    parentUl = $('<ul id="zgj-ul-' + nodeType + '-' + parentId + '" class="zgj-tree-level-' + nodeType + '"></ul>');
                                    parentNode.append(parentUl);
                                }
                                parentUl.append(node);
                            } else {
                                parentNode.append(node);
                            }
                        }
                    } else {
                        root.append(node);
                    }
                });
                //点击：展开/收起
                _this.find("span").click(function () {
                    var parent = $(this).parent("li");
                    if (parent.attr("hidefocus") === 'close') {
                        parent.attr("hidefocus", 'open');
                    } else {
                        parent.attr("hidefocus", 'close');
                        $(this).siblings("ul").find("li").attr("hidefocus", 'close');
                    }
                });
                //点击：选中
                _this.find("a").click(function () {
                    _this.find("a").removeAttr("selected");
                    $(this).attr("selected", "yes");
                    defaults.selectedId = $(this).attr("id") && $(this).attr("id").split("zgj-tree-a-").length > 1 ? $(this).attr("id").split("zgj-tree-a-")[1] : null;
                });
            } else {
                _this.append('no data');
            }
        },
        //根据openId展开
        locationOpen: function (openId) {
            _this.find("a").removeAttr("selected");
            $("#zgj-tree-a-" + openId).parents("li").attr("hidefocus", 'open');
            $("#zgj-tree-a-" + openId).attr("selected", true);
        },
        //获取选中的对象ID
        getSelected: function () {
            return defaults.selectedId;
        },
        zgjTree: function (options) {
            var _this = this;
            _this.initTree(options);
            if (options.openId) {
                _this.locationOpen(options.openId);
            }

            function getSelected() {
                return _this.getSelected;
            }
        }
    });
})(jQuery);

