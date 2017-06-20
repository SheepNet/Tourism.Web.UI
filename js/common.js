/*
 * 上传文件分类
 */
var FILETYPE = {
    'IMAGE': 'IMAGE',
    'FILE': 'FILE'
};
/*
 * 文件MIME格式
 */
var FILEMIME = {
    'IMAGE': ['image/gif', 'image/jpeg', 'image/png', 'image/bmp','image/svg+xml'],
    'FILE': ['image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/x-icon', 'application/msword', 'application/pdf',
        'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/zip','application/rar', 'text/html', 'text/plain'
    ]
}
/*
 * 上传文件大小限制
 */
var FILESIZE = {
    'IMAGE': 2 * 1024 * 1024,
    'FILE': 4 * 1024 * 1024,
    'TOTALFILE': 10 * 1024 * 1024
}

/*
 * 允许的文件后缀
 */
var FILEEXTENTIONS = {
    'FILE': ['zip','rar','pdf']
}

var rurl="http://chinaz.live/resource";

var $ui = {
    /*
     * 文件上传
     * @fileSelector          {string}       上传控件选择器
     * @type            {string}       上传文件类型
     * @moudle          {string}       模块名称
     * @useStaticRoute  {bool}         是否使用静态路由（新）【使用静态路由则在返回的地址中不包含后台文件的相对路径】
     * @data            {}             文件流
     * options          {json          {fileSelector:'', type:FILETYPE.IMAGE, moudle:'BASE'}
     * obj              {HtmlElement}  上传控件本身（如果参数fileId存在，则无效）
     * will_save        {boolean}      是否存数据库
     * pathsep          {boolean}      上传的文件保存路径区分(true:放在web端，但web和service必须在同一服务器上)
     */
    fileupload: function(options) {
        var formdata = new FormData();
        var fileObj = null;
        var maxSizeErrorStr = ''; //超过最大大小后的错误文本
        var returnVal = false;
        var uuid;
        if (options.fileSelector) {
            fileObj = $(options.fileSelector)[0].files;
        } else if (options.obj) {
            fileObj = options.obj.files;
        }
        //debugger
        var MaxSize = 0;
        if (fileObj.length > 0) {
            var extension = '';
            var file = fileObj[0];

            //获取文件扩展名
            if (file.name != '' && file.name.indexOf('.') > -1) {
                extension = file.name.substr(file.name.indexOf('.') + 1);
            }
            //文件类型校验
            if (options.type == FILETYPE.IMAGE && FILEMIME.IMAGE.indexOf(file.type) == -1) {
                alert("ImageTypeError");

                return false;
            } else if (options.type == FILETYPE.FILE && FILEMIME.FILE.indexOf(file.type) == -1 && !FILEEXTENTIONS.FILE.indexOf(extension)) {
                alert("FileTypeError");
                return false;
            }

            //文件大小验证
            if (file.size) {
                if (options.type == FILETYPE.IMAGE && file.size > FILESIZE.IMAGE) {
                    maxSizeErrorStr = String.format($ui.language.Base['MaxSizeImage'], FILESIZE.IMAGE / 1024 / 1024);
                } else if (options.type == FILETYPE.FILE && file.size > FILESIZE.FILE) {
                    maxSizeErrorStr = String.format($ui.language.Base['SingleMaxSize'], FILESIZE.FILE / 1024 / 1024);
                }
                MaxSize += file.size;
            }
            if (maxSizeErrorStr == '' && MaxSize > FILESIZE.TOTALFILE) {
                maxSizeErrorStr = String.format($ui.language.Base['MaxSizeFile'], FILESIZE.TOTALFILE / 1024 / 1024);
            }
            if (maxSizeErrorStr != '') {
                alert("maxSizeErrorStr");
                return '';
            }

            var ft = options.type ? options.type : FILETYPE.IMAGE;
            ft = options.useStaticRoute ? FILETYPE.FILE : ft; //如果使用静态路由，则全部为“FILETYPE.FILE”
            var fm = options.moudle ? options.moudle : 'BASE';
            formdata.append('upload', file);
            $.ajax({// 文件名用时间戳，目地是为了避免文件名中因为存在空格等特殊字符而造成的上传失败
                url: rurl + '/upload?type=2&filename=' + (new Date()).valueOf() + '.' + extension + '&program_type=' + fm, //上传服务路径,
                data: formdata,
                type: "post",
                cache: false,
                async: false,
                processData: false,
                contentType: false,
                success: function(data) {
                    var code = data.code;
                    if (code == "3002") {
                        alert("3002 | sessionStorage.clear();");
                    } else if (code == "3010") {
                        alert("3010");
                    } else if (code === 0) {
                        uuid = data.uuid;
                        returnVal = {
                            uuid: data.uuid,
                            path: rurl + '/resource/' + uuid
                        };
                    } else {
                        alert(data.msgbody);

                    }
                },
                error: function() {}
            });
        }

        if (uuid) {
            var $fileuploadWrap = $(options.fileSelector).closest('[data-provides="fileupload"]');
            var $preview = $fileuploadWrap.find('.thumbnail');
            var $text = $preview.find('.upload-text');

            var isImage = typeof fileObj[0].type !== "undefined" ? fileObj[0].type.match('image.*') : fileObj[0].name.match('\\.(gif|png|jpe?g)$');

            //如果是图片，就显示图片（base64转码）
            if (isImage) {
                var reader = new FileReader();
                $text.remove();
                reader.onload = function(e) {
                    // 如果从后台拿的不是立马有的。。。 baseSetting.fileUploadPath + '/resource/' + uuid;
                    $preview.css('background-image', 'url(' + e.target.result + ')');
                }
                reader.readAsDataURL(fileObj[0]);
            }
            //不是图片则显示文件名
            else {
                $text.text(fileObj[0].name);
            }

        }
        return returnVal;
    },

    /*
     * fileupload图片赋值
     * @wrapSelector     {string}       上传控件的选择器
     * @uuid             {string}       图片的uuid
     * @obj              {HtmlElement}  上传控件本身（如果参数id存在，则无效）
     * @module           {string}       模块名称
     * @useStaticRoute   {bool}         是否使用静态路由（新）【使用静态路由则在返回的地址中不包含后台文件的相对路径】
     */
    imgload: function(options) {
        if( options.wrapSelector){
            if (options.uuid || options.imgsrc) {
                var src = options.imgsrc || $ui.getResourceLocation(options.uuid);
                $(options.wrapSelector)
                    .css('background-image', 'url(' + src + ')')
                    .find('.upload-text')
                    .hide();// 用remove 会导致 upload-text 里的内容因为多语言的关系而报错。
            }else{
                $(options.wrapSelector)
                    .css('background-image', '')
                    .find('.upload-text')
                    .show();
            }
        }

    },
    /*
     * 获取之前上传资源的路径
     */
    getResourceLocation: function(uuid) {
        return rurl + '/resource/' + uuid;
    }
};
