'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var login = function (_wepy$page) {
  _inherits(login, _wepy$page);

  function login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = login.__proto__ || Object.getPrototypeOf(login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '用户绑定'
    }, _this.data = {
      isAgree: true,
      school_list: [],
      school_index: 0,
      school_id: 1,
      authcode: '',
      is_code: 0,
      userinfo: []
    }, _this.methods = {
      bindCountryChange: function bindCountryChange(e) {
        console.log(e);
        console.log(this.school_list);
        this.school_index = e.detail.value;
        this.school_id = this.school_list[e.detail.value].id;
        this.authcode = 'https://yczs.yntulin.com/authcode/?openid=' + this.userinfo.openid + '&id=' + this.school_id;
        this.is_code = this.school_list[this.school_index].is_code;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(login, [{
    key: 'onLoad',
    value: function onLoad() {
      var self = this;
      self.$parent.getUserInfo(function (data) {
        self.userinfo = data;
        _wepy2.default.request({
          url: 'https://yczs.yntulin.com/get_schllo_list/',
          method: 'GET',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function success(res) {
            self.school_list = res.data.items;

            self.authcode = 'https://yczs.yntulin.com/authcode/?openid=' + self.userinfo.openid + '&id=' + self.school_id;

            self.is_code = self.school_list[self.school_index].is_code;
            self.$apply();
          }
        });
      });
    }
  }]);

  return login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc0FncmVlIiwic2Nob29sX2xpc3QiLCJzY2hvb2xfaW5kZXgiLCJzY2hvb2xfaWQiLCJhdXRoY29kZSIsImlzX2NvZGUiLCJ1c2VyaW5mbyIsIm1ldGhvZHMiLCJiaW5kQ291bnRyeUNoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCJpZCIsIm9wZW5pZCIsInNlbGYiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsInJlcyIsIml0ZW1zIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsSUFESjtBQUVMQyxtQkFBYSxFQUZSO0FBR0xDLG9CQUFjLENBSFQ7QUFJTEMsaUJBQVcsQ0FKTjtBQUtMQyxnQkFBVSxFQUxMO0FBTUxDLGVBQVMsQ0FOSjtBQU9MQyxnQkFBVTtBQVBMLEssUUFpQ1BDLE8sR0FBVTtBQUNSQyx1QkFEUSw2QkFDV0MsQ0FEWCxFQUNjO0FBQ3BCQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS1YsV0FBakI7QUFDQSxhQUFLQyxZQUFMLEdBQW9CTyxFQUFFRyxNQUFGLENBQVNDLEtBQTdCO0FBQ0EsYUFBS1YsU0FBTCxHQUFpQixLQUFLRixXQUFMLENBQWlCUSxFQUFFRyxNQUFGLENBQVNDLEtBQTFCLEVBQWlDQyxFQUFsRDtBQUNBLGFBQUtWLFFBQUwsR0FBZ0IsK0NBQTZDLEtBQUtFLFFBQUwsQ0FBY1MsTUFBM0QsR0FBa0UsTUFBbEUsR0FBMkUsS0FBS1osU0FBaEc7QUFDQSxhQUFLRSxPQUFMLEdBQWUsS0FBS0osV0FBTCxDQUFpQixLQUFLQyxZQUF0QixFQUFvQ0csT0FBbkQ7QUFDRDtBQVJPLEs7Ozs7OzZCQXZCRDtBQUNQLFVBQUlXLE9BQU8sSUFBWDtBQUNBQSxXQUFLQyxPQUFMLENBQWFDLFdBQWIsQ0FBeUIsVUFBU25CLElBQVQsRUFBZTtBQUN0Q2lCLGFBQUtWLFFBQUwsR0FBZ0JQLElBQWhCO0FBQ0EsdUJBQUtvQixPQUFMLENBQWE7QUFDWEMsZUFBSywyQ0FETTtBQUVYQyxrQkFBUSxLQUZHO0FBR1hDLGtCQUFRLEVBQUMsZ0JBQWdCLG1DQUFqQixFQUhHO0FBSVhDLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJSLGlCQUFLZixXQUFMLEdBQW1CdUIsSUFBSXpCLElBQUosQ0FBUzBCLEtBQTVCOztBQUVBVCxpQkFBS1osUUFBTCxHQUFnQiwrQ0FBNkNZLEtBQUtWLFFBQUwsQ0FBY1MsTUFBM0QsR0FBa0UsTUFBbEUsR0FBMkVDLEtBQUtiLFNBQWhHOztBQUVBYSxpQkFBS1gsT0FBTCxHQUFlVyxLQUFLZixXQUFMLENBQWlCZSxLQUFLZCxZQUF0QixFQUFvQ0csT0FBbkQ7QUFDQVcsaUJBQUtVLE1BQUw7QUFDRDtBQVhVLFNBQWI7QUFhRCxPQWZEO0FBbUJEOzs7O0VBbkNnQyxlQUFLQyxJOztrQkFBbkIvQixLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlKjmiLfnu5HlrponXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBpc0FncmVlOiB0cnVlLFxuICAgICAgc2Nob29sX2xpc3Q6IFtdLFxuICAgICAgc2Nob29sX2luZGV4OiAwLFxuICAgICAgc2Nob29sX2lkOiAxLFxuICAgICAgYXV0aGNvZGU6ICcnLFxuICAgICAgaXNfY29kZTogMCxcbiAgICAgIHVzZXJpbmZvOiBbXVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgc2VsZi4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgc2VsZi51c2VyaW5mbyA9IGRhdGFcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3ljenMueW50dWxpbi5jb20vZ2V0X3NjaGxsb19saXN0LycsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHNlbGYuc2Nob29sX2xpc3QgPSByZXMuZGF0YS5pdGVtc1xuXG4gICAgICAgICAgICBzZWxmLmF1dGhjb2RlID0gJ2h0dHBzOi8veWN6cy55bnR1bGluLmNvbS9hdXRoY29kZS8/b3BlbmlkPScrc2VsZi51c2VyaW5mby5vcGVuaWQrJyZpZD0nICsgc2VsZi5zY2hvb2xfaWRcblxuICAgICAgICAgICAgc2VsZi5pc19jb2RlID0gc2VsZi5zY2hvb2xfbGlzdFtzZWxmLnNjaG9vbF9pbmRleF0uaXNfY29kZVxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG5cblxuICAgICAgXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRDb3VudHJ5Q2hhbmdlIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2Nob29sX2xpc3QpXG4gICAgICAgIHRoaXMuc2Nob29sX2luZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5zY2hvb2xfaWQgPSB0aGlzLnNjaG9vbF9saXN0W2UuZGV0YWlsLnZhbHVlXS5pZFxuICAgICAgICB0aGlzLmF1dGhjb2RlID0gJ2h0dHBzOi8veWN6cy55bnR1bGluLmNvbS9hdXRoY29kZS8/b3BlbmlkPScrdGhpcy51c2VyaW5mby5vcGVuaWQrJyZpZD0nICsgdGhpcy5zY2hvb2xfaWRcbiAgICAgICAgdGhpcy5pc19jb2RlID0gdGhpcy5zY2hvb2xfbGlzdFt0aGlzLnNjaG9vbF9pbmRleF0uaXNfY29kZVxuICAgICAgfVxuICAgIH1cblxuICB9XG4iXX0=