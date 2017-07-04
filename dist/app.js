'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/login', 'pages/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#1296db',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white',
        backgroundColor: '#f3f3f3'
        // tabBar: {
        //   borderStyle: 'white',
        //   backgroundColor: '#fff',
        //   selectedColor: '#1296db',
        //   list: [{
        //     pagePath: 'pages/home',
        //     text: '首页',
        //     iconPath: './assets/images/home.png',
        //     selectedIconPath: './assets/images/home1.png'
        //   }, {
        //     pagePath: 'pages/my',
        //     text: '个人中心',
        //     iconPath: './assets/images/my.png',
        //     selectedIconPath: './assets/images/my1.png'
        //   }]
        // }
      } };
    _this.globalData = {
      userInfo: null,
      openid: '',
      Location: null,
      loaduserInfo: false,
      reqkey: '',
      shareTicket: ''
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.shareTicket) {
                  this.globalData.shareTicket = e.shareTicket;
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLaunch(_x) {
        return _ref.apply(this, arguments);
      }

      return onLaunch;
    }()
  }, {
    key: 'scan',
    value: function scan() {
      var self = this;
      _wepy2.default.scanCode({
        onlyFromCamera: true,
        success: function success(res) {
          console.log(res);
          console.log('识别成功');
          self.lzpost({
            m: 'Ynufe',
            c: 'Book',
            a: 'get_book_info',
            u: res.result
          }, function (data) {
            if (data.state) {
              _wepy2.default.navigateTo({
                url: 'addbook?u=' + res.result
              });
            } else {
              _wepy2.default.showModal({
                title: '上架提示',
                content: data.msg,
                showCancel: false
              });
            }
          });
        }
      });
    }
  }, {
    key: 'optionScan',
    value: function optionScan() {
      var isscan = _wepy2.default.getStorageSync('isscan');
      var self = this;
      if (!isscan) {
        _wepy2.default.showModal({
          title: '栗子书屋-温馨提示',
          content: '直接扫描图书背面的条码即可上识别图书。',
          success: function success() {
            _wepy2.default.setStorageSync('isscan', true);
            self.scan();
          }
        });
      } else {
        self.scan();
      }
    }
  }, {
    key: 'getShareInfo',
    value: function getShareInfo() {
      var shareTicket = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var that = this;
      return new Promise(function (resolve, reject) {
        _wepy2.default.getShareInfo({
          shareTicket: shareTicket,
          success: function success(shareinfo) {
            console.log('获取分享信息成功');
            console.log(shareinfo);
            resolve(shareinfo);
          },
          fail: function fail(e) {
            reject(e);
          }
        });
      }).then(function (shareinfo) {
        return new Promise(function (resolve, reject) {
          that.lzpost({
            m: 'Ynufe',
            c: 'XcxLogin',
            a: 'WxgroupDecode',
            iv: shareinfo.iv,
            encryptedData: shareinfo.encryptedData
          }, function (groupinfo) {
            console.log('群组信息解密成功');
            resolve(groupinfo);
          });
        });
      });
    }
  }, {
    key: 'plogin',
    value: function plogin() {
      console.log('plogin');
      var that = this;
      // 检测是否已经登录
      var pl = new Promise(function (resolve, reject) {
        _wepy2.default.checkSession({
          // 登陆后直接获取reqkey，查看是否能正常获取到以及是否过期。
          success: function success(d) {
            _wepy2.default.getStorage({
              key: 'reqkey',
              success: function success(res) {
                var timestamp = Date.parse(new Date()) / 1000;
                if (res.data.reqkey !== '' && timestamp < res.data.expires_in) {
                  resolve(res.data.reqkey);
                } else {
                  reject();
                }
              },
              // 检测未登录直接执行登陆程序，并获取reqkey
              fail: function fail(res) {
                reject();
              }
            });
          },
          fail: function fail() {
            reject();
          }
        });
      });
      var result = pl.then(function (d) {
        // 检测到登陆成功后不执行任何成，返回Promise并使用传入reqkey,等待下一步成功调用执行
        return new Promise(function (resolve, reject) {
          resolve(d);
        });
      }, function (d) {
        // 检测未登录成功，执行小程序登陆程序，并远程请求用户的reqkey,之后等待下一步成功之后的调用
        var p = new Promise(function (resolve, reject) {
          _wepy2.default.login({
            success: function success(res) {
              resolve(res);
            }
          });
        });
        return p.then(function (d) {
          return that.prequest({
            m: 'Ynufe',
            c: 'XcxLogin',
            a: 'Login',
            code: d.code
          }).then(function (d) {
            _wepy2.default.setStorageSync('reqkey', d);
            return new Promise(function (resolve, reject) {
              resolve(d.reqkey);
            });
          });
        });
      });
      return result;
    }
  }, {
    key: 'prequest',
    value: function prequest(data) {
      var apiurl = 'https://xxapi.yntulin.com/ynufeapi.php';
      data.reqkey = this.globalData.reqkey;
      _wepy2.default.showNavigationBarLoading();
      var p = new Promise(function (resolve, reject) {
        _wepy2.default.request({
          url: apiurl,
          data: data,
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function success(res) {
            var code = res.data.data.data_code;
            var resData = res.data.data.data_arr;
            if (code === 1) {
              resolve(resData);
              _wepy2.default.hideNavigationBarLoading();
            }
          }
        });
      });
      return p;
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var _this2 = this;

      var that = this;
      if (this.globalData.userInfo) {
        cb && cb(this.globalData.userInfo);
        return;
      }
      if (this.globalData.loaduserInfo) {
        return;
      }
      this.globalData.loaduserInfo = true;
      this.plogin().then(function (reqkey) {
        that.globalData.reqkey = reqkey;
        return new Promise(function (resolve, reject) {
          _wepy2.default.getUserInfo({
            withCredentials: true,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function success(userres) {
              console.log(userres);
              var data = {
                m: 'Ynufe',
                c: 'XcxLogin',
                a: 'WxDecode',
                iv: userres.iv,
                encryptedData: userres.encryptedData,
                reqkey: reqkey
              };
              resolve(data);
            },
            fail: function fail(userres) {
              var data = {
                m: 'Ynufe',
                c: 'UsersWx',
                a: 'get_wxuser_info',
                reqkey: reqkey
              };
              resolve(data);
            }
          });
        });
      }).then(function (d) {
        return _this2.prequest(d);
      }).then(function (d) {
        that.globalData.userInfo = d;
        that.globalData.loaduserInfo = false;
        cb && cb(d);
      });
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      var that = this;
      return new Promise(function (resolve, reject) {
        var location = that.globalData.location;
        if (location) {
          resolve(location);
        } else {
          _wepy2.default.getLocation({
            success: function success(res) {
              that.globalData.location = res;
              resolve(res);
            },
            fail: function fail(res) {
              reject(res);
            }
          });
        }
      });
    }
  }, {
    key: 'lzpost',
    value: function lzpost() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments[1];
      var isuser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var loadtype = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      var apiurl = 'https://xxapi.yntulin.com/ynufeapi.php';
      if (!data.a) return;
      if (loadtype) {
        _wepy2.default.showLoading({
          title: '加载中...'
        });
      } else {
        _wepy2.default.showNavigationBarLoading();
      }
      if (isuser) {
        this.plogin().then(function (d) {
          data.reqkey = d;
          _wepy2.default.request({
            url: apiurl,
            data: data,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function success(res) {
              var code = res.data.data.data_code;
              var resData = res.data.data.data_arr;
              if (code === 1) {
                cb && cb(resData);
              }
            },
            complete: function complete() {
              _wepy2.default.hideLoading();
              _wepy2.default.hideNavigationBarLoading();
            }
          });
        });
      } else {
        _wepy2.default.request({
          url: apiurl,
          data: data,
          success: function success(res) {
            var code = res.data.data.data_code;
            var resData = res.data.data.data_arr;
            if (code === 1) {
              cb && cb(resData);
              _wepy2.default.hideLoading();
              _wepy2.default.hideNavigationBarLoading();
            }
          }
        });
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJvcGVuaWQiLCJMb2NhdGlvbiIsImxvYWR1c2VySW5mbyIsInJlcWtleSIsInNoYXJlVGlja2V0IiwidXNlIiwiZSIsInNlbGYiLCJzY2FuQ29kZSIsIm9ubHlGcm9tQ2FtZXJhIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJsenBvc3QiLCJtIiwiYyIsImEiLCJ1IiwicmVzdWx0IiwiZGF0YSIsInN0YXRlIiwibmF2aWdhdGVUbyIsInVybCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsIm1zZyIsInNob3dDYW5jZWwiLCJpc3NjYW4iLCJnZXRTdG9yYWdlU3luYyIsInNldFN0b3JhZ2VTeW5jIiwic2NhbiIsInRoYXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldFNoYXJlSW5mbyIsInNoYXJlaW5mbyIsImZhaWwiLCJ0aGVuIiwiaXYiLCJlbmNyeXB0ZWREYXRhIiwiZ3JvdXBpbmZvIiwicGwiLCJjaGVja1Nlc3Npb24iLCJkIiwiZ2V0U3RvcmFnZSIsImtleSIsInRpbWVzdGFtcCIsIkRhdGUiLCJwYXJzZSIsImV4cGlyZXNfaW4iLCJwIiwibG9naW4iLCJwcmVxdWVzdCIsImNvZGUiLCJhcGl1cmwiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwiZGF0YV9jb2RlIiwicmVzRGF0YSIsImRhdGFfYXJyIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwiY2IiLCJwbG9naW4iLCJnZXRVc2VySW5mbyIsIndpdGhDcmVkZW50aWFscyIsInVzZXJyZXMiLCJsb2NhdGlvbiIsImdldExvY2F0aW9uIiwiaXN1c2VyIiwibG9hZHR5cGUiLCJzaG93TG9hZGluZyIsImNvbXBsZXRlIiwiaGlkZUxvYWRpbmciLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQTBDRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBdkNmQSxNQXVDZSxHQXZDTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssQ0FEQTtBQUtQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCLE9BSmxCO0FBS05DLHlCQUFpQjtBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXRCUSxPQUxELEVBdUNNO0FBQUEsVUFUZkMsVUFTZSxHQVRGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsY0FBUSxFQUZHO0FBR1hDLGdCQUFVLElBSEM7QUFJWEMsb0JBQWMsS0FKSDtBQUtYQyxjQUFRLEVBTEc7QUFNWEMsbUJBQWE7QUFORixLQVNFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRmE7QUFHZDs7Ozs7NEVBRWNDLEM7Ozs7O0FBQ2Isb0JBQUlBLEVBQUVGLFdBQU4sRUFBbUI7QUFDakIsdUJBQUtOLFVBQUwsQ0FBZ0JNLFdBQWhCLEdBQThCRSxFQUFFRixXQUFoQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBR0s7QUFDTixVQUFJRyxPQUFPLElBQVg7QUFDQSxxQkFBS0MsUUFBTCxDQUFjO0FBQ1pDLHdCQUFnQixJQURKO0FBRVpDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEJDLGtCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQUMsa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FOLGVBQUtPLE1BQUwsQ0FBWTtBQUNW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U0FBekI7QUFDQSxrQkFBSUMsVUFBVXBELElBQUlTLElBQUosQ0FBU0EsSUFBVCxDQUFjNEMsUUFBNUI7QUFDQSxrQkFBSVIsU0FBUyxDQUFiLEVBQWdCO0FBQ2RVLHNCQUFNQSxHQUFHSCxPQUFILENBQU47QUFDRDtBQUNGLGFBWFU7QUFZWGEsc0JBQVcsb0JBQVk7QUFDckIsNkJBQUtDLFdBQUw7QUFDQSw2QkFBS1osd0JBQUw7QUFDRDtBQWZVLFdBQWI7QUFpQkQsU0FuQkQ7QUFvQkQsT0FyQkQsTUFxQk87QUFDTCx1QkFBS04sT0FBTCxDQUFhO0FBQ1hwQyxlQUFLa0MsTUFETTtBQUVYckMsZ0JBQU1BLElBRks7QUFHWFYsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSTZDLE9BQU83QyxJQUFJUyxJQUFKLENBQVNBLElBQVQsQ0FBYzBDLFNBQXpCO0FBQ0EsZ0JBQUlDLFVBQVVwRCxJQUFJUyxJQUFKLENBQVNBLElBQVQsQ0FBYzRDLFFBQTVCO0FBQ0EsZ0JBQUlSLFNBQVMsQ0FBYixFQUFnQjtBQUNkVSxvQkFBTUEsR0FBR0gsT0FBSCxDQUFOO0FBQ0EsNkJBQUtjLFdBQUw7QUFDQSw2QkFBS1osd0JBQUw7QUFDRDtBQUNGO0FBWFUsU0FBYjtBQWFEO0FBQ0Y7Ozs7RUFwVTBCLGVBQUthLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2luZGV4J1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMxMjk2ZGInLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YzZjNmMydcbiAgICB9XG4gICAgLy8gdGFiQmFyOiB7XG4gICAgLy8gICBib3JkZXJTdHlsZTogJ3doaXRlJyxcbiAgICAvLyAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgIC8vICAgc2VsZWN0ZWRDb2xvcjogJyMxMjk2ZGInLFxuICAgIC8vICAgbGlzdDogW3tcbiAgICAvLyAgICAgcGFnZVBhdGg6ICdwYWdlcy9ob21lJyxcbiAgICAvLyAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgLy8gICAgIGljb25QYXRoOiAnLi9hc3NldHMvaW1hZ2VzL2hvbWUucG5nJyxcbiAgICAvLyAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vYXNzZXRzL2ltYWdlcy9ob21lMS5wbmcnXG4gICAgLy8gICB9LCB7XG4gICAgLy8gICAgIHBhZ2VQYXRoOiAncGFnZXMvbXknLFxuICAgIC8vICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJyxcbiAgICAvLyAgICAgaWNvblBhdGg6ICcuL2Fzc2V0cy9pbWFnZXMvbXkucG5nJyxcbiAgICAvLyAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vYXNzZXRzL2ltYWdlcy9teTEucG5nJ1xuICAgIC8vICAgfV1cbiAgICAvLyB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIG9wZW5pZDogJycsXG4gICAgTG9jYXRpb246IG51bGwsXG4gICAgbG9hZHVzZXJJbmZvOiBmYWxzZSxcbiAgICByZXFrZXk6ICcnLFxuICAgIHNoYXJlVGlja2V0OiAnJ1xuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gIH1cblxuICBhc3luYyBvbkxhdW5jaChlKSB7XG4gICAgaWYgKGUuc2hhcmVUaWNrZXQpIHtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5zaGFyZVRpY2tldCA9IGUuc2hhcmVUaWNrZXRcbiAgICB9XG4gIH1cblxuICBzY2FuICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB3ZXB5LnNjYW5Db2RlKHtcbiAgICAgIG9ubHlGcm9tQ2FtZXJhOiB0cnVlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNvbnNvbGUubG9nKCfor4bliKvmiJDlip8nKVxuICAgICAgICBzZWxmLmx6cG9zdCh7XG4gICAgICAgICAgbTogJ1ludWZlJyxcbiAgICAgICAgICBjOiAnQm9vaycsXG4gICAgICAgICAgYTogJ2dldF9ib29rX2luZm8nLFxuICAgICAgICAgIHU6IHJlcy5yZXN1bHRcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0ZSkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnYWRkYm9vaz91PScgKyByZXMucmVzdWx0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5LiK5p625o+Q56S6JyxcbiAgICAgICAgICAgICAgY29udGVudDogZGF0YS5tc2csXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb3B0aW9uU2NhbiAoKSB7XG4gICAgdmFyIGlzc2NhbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2lzc2NhbicpXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgaWYgKCFpc3NjYW4pIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmoJflrZDkuablsYst5rip6aao5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ebtOaOpeaJq+aPj+WbvuS5puiDjOmdoueahOadoeeggeWNs+WPr+S4iuivhuWIq+WbvuS5puOAgicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2lzc2NhbicsdHJ1ZSlcbiAgICAgICAgICBzZWxmLnNjYW4oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1lbHNle1xuICAgICAgc2VsZi5zY2FuKClcbiAgICB9XG4gIH1cblxuICBnZXRTaGFyZUluZm8gKHNoYXJlVGlja2V0ID0gJycpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd2VweS5nZXRTaGFyZUluZm8oe1xuICAgICAgICBzaGFyZVRpY2tldDogc2hhcmVUaWNrZXQsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChzaGFyZWluZm8pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5YiG5Lqr5L+h5oGv5oiQ5YqfJylcbiAgICAgICAgICBjb25zb2xlLmxvZyhzaGFyZWluZm8pXG4gICAgICAgICAgcmVzb2x2ZShzaGFyZWluZm8pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSkudGhlbihmdW5jdGlvbihzaGFyZWluZm8pIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoYXQubHpwb3N0KHtcbiAgICAgICAgICBtOiAnWW51ZmUnLFxuICAgICAgICAgIGM6ICdYY3hMb2dpbicsXG4gICAgICAgICAgYTogJ1d4Z3JvdXBEZWNvZGUnLFxuICAgICAgICAgIGl2OiBzaGFyZWluZm8uaXYsXG4gICAgICAgICAgZW5jcnlwdGVkRGF0YTogc2hhcmVpbmZvLmVuY3J5cHRlZERhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oZ3JvdXBpbmZvKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+e+pOe7hOS/oeaBr+ino+WvhuaIkOWKnycpXG4gICAgICAgICAgcmVzb2x2ZShncm91cGluZm8pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwbG9naW4gKCkge1xuICAgIGNvbnNvbGUubG9nKCdwbG9naW4nKVxuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIC8vIOajgOa1i+aYr+WQpuW3sue7j+eZu+W9lVxuICAgIHZhciBwbCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgd2VweS5jaGVja1Nlc3Npb24oe1xuICAgICAgICAvLyDnmbvpmYblkI7nm7TmjqXojrflj5ZyZXFrZXnvvIzmn6XnnIvmmK/lkKbog73mraPluLjojrflj5bliLDku6Xlj4rmmK/lkKbov4fmnJ/jgIJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHdlcHkuZ2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXk6ICdyZXFrZXknLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIHZhciB0aW1lc3RhbXAgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpIC8gMTAwMFxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEucmVxa2V5ICE9PSAnJyAmJiB0aW1lc3RhbXAgPCByZXMuZGF0YS5leHBpcmVzX2luKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YS5yZXFrZXkpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIOajgOa1i+acqueZu+W9leebtOaOpeaJp+ihjOeZu+mZhueoi+W6j++8jOW5tuiOt+WPlnJlcWtleVxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIHJlamVjdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICAgIHZhciByZXN1bHQgPSBwbC50aGVuKGZ1bmN0aW9uKGQpIHtcbiAgICAgIC8vIOajgOa1i+WIsOeZu+mZhuaIkOWKn+WQjuS4jeaJp+ihjOS7u+S9leaIkO+8jOi/lOWbnlByb21pc2Xlubbkvb/nlKjkvKDlhaVyZXFrZXks562J5b6F5LiL5LiA5q2l5oiQ5Yqf6LCD55So5omn6KGMXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc29sdmUoZClcbiAgICAgIH0pXG4gICAgfSwgZnVuY3Rpb24oZCkge1xuICAgICAgLy8g5qOA5rWL5pyq55m75b2V5oiQ5Yqf77yM5omn6KGM5bCP56iL5bqP55m76ZmG56iL5bqP77yM5bm26L+c56iL6K+35rGC55So5oi355qEcmVxa2V5LOS5i+WQjuetieW+heS4i+S4gOatpeaIkOWKn+S5i+WQjueahOiwg+eUqFxuICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgd2VweS5sb2dpbih7XG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHJldHVybiBwLnRoZW4oKGQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoYXQucHJlcXVlc3Qoe1xuICAgICAgICAgIG06ICdZbnVmZScsXG4gICAgICAgICAgYzogJ1hjeExvZ2luJyxcbiAgICAgICAgICBhOiAnTG9naW4nLFxuICAgICAgICAgIGNvZGU6IGQuY29kZVxuICAgICAgICB9KS50aGVuKChkKSA9PiB7XG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVxa2V5JywgZClcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGQucmVxa2V5KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgcHJlcXVlc3QgKGRhdGEpIHtcbiAgICB2YXIgYXBpdXJsID0gJ2h0dHBzOi8veHhhcGkueW50dWxpbi5jb20veW51ZmVhcGkucGhwJ1xuICAgIGRhdGEucmVxa2V5ID0gdGhpcy5nbG9iYWxEYXRhLnJlcWtleVxuICAgIHdlcHkuc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBhcGl1cmwsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgdmFyIGNvZGUgPSByZXMuZGF0YS5kYXRhLmRhdGFfY29kZVxuICAgICAgICAgIHZhciByZXNEYXRhID0gcmVzLmRhdGEuZGF0YS5kYXRhX2FyclxuICAgICAgICAgIGlmIChjb2RlID09PSAxKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc0RhdGEpXG4gICAgICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHBcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICBjYiAmJiBjYih0aGlzLmdsb2JhbERhdGEudXNlckluZm8pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS5sb2FkdXNlckluZm8pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmdsb2JhbERhdGEubG9hZHVzZXJJbmZvID0gdHJ1ZVxuICAgIHRoaXMucGxvZ2luKCkudGhlbigocmVxa2V5KSA9PiB7XG4gICAgICB0aGF0Lmdsb2JhbERhdGEucmVxa2V5ID0gcmVxa2V5XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgICAgIHN1Y2Nlc3MgKHVzZXJyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJyZXMpXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgbTogJ1ludWZlJyxcbiAgICAgICAgICAgICAgYzogJ1hjeExvZ2luJyxcbiAgICAgICAgICAgICAgYTogJ1d4RGVjb2RlJyxcbiAgICAgICAgICAgICAgaXY6IHVzZXJyZXMuaXYsXG4gICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHVzZXJyZXMuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgcmVxa2V5OiByZXFrZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKHVzZXJyZXMpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBtOiAnWW51ZmUnLFxuICAgICAgICAgICAgICBjOiAnVXNlcnNXeCcsXG4gICAgICAgICAgICAgIGE6ICdnZXRfd3h1c2VyX2luZm8nLFxuICAgICAgICAgICAgICByZXFrZXk6IHJlcWtleVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSkudGhlbigoZCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucHJlcXVlc3QoZClcbiAgICB9KS50aGVuKChkKSA9PiB7XG4gICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSBkXG4gICAgICB0aGF0Lmdsb2JhbERhdGEubG9hZHVzZXJJbmZvID0gZmFsc2VcbiAgICAgIGNiICYmIGNiKGQpXG4gICAgfSlcbiAgfVxuXG4gIGdldExvY2F0aW9uKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IHRoYXQuZ2xvYmFsRGF0YS5sb2NhdGlvblxuICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgIHJlc29sdmUobG9jYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LmdldExvY2F0aW9uKHtcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEubG9jYXRpb24gPSByZXNcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGx6cG9zdCAoZGF0YSA9IHt9LCBjYiwgaXN1c2VyID0gdHJ1ZSwgbG9hZHR5cGUgPSAxKSB7XG4gICAgdmFyIGFwaXVybCA9ICdodHRwczovL3h4YXBpLnludHVsaW4uY29tL3ludWZlYXBpLnBocCdcbiAgICBpZiAoIWRhdGEuYSkgcmV0dXJuXG4gICAgaWYgKGxvYWR0eXBlKSB7XG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgfVxuICAgIGlmIChpc3VzZXIpIHtcbiAgICAgIHRoaXMucGxvZ2luKCkudGhlbigoZCkgPT4ge1xuICAgICAgICBkYXRhLnJlcWtleSA9IGRcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGFwaXVybCxcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSByZXMuZGF0YS5kYXRhLmRhdGFfY29kZVxuICAgICAgICAgICAgdmFyIHJlc0RhdGEgPSByZXMuZGF0YS5kYXRhLmRhdGFfYXJyXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gMSkge1xuICAgICAgICAgICAgICBjYiAmJiBjYihyZXNEYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGFwaXVybCxcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBjb2RlID0gcmVzLmRhdGEuZGF0YS5kYXRhX2NvZGVcbiAgICAgICAgICB2YXIgcmVzRGF0YSA9IHJlcy5kYXRhLmRhdGEuZGF0YV9hcnJcbiAgICAgICAgICBpZiAoY29kZSA9PT0gMSkge1xuICAgICAgICAgICAgY2IgJiYgY2IocmVzRGF0YSlcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgd2VweS5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==