/**
 * 重定向选项
 *
 * @class meta.RedirectOptions
 */
function RedirectOptions() {
    /**
     * 静默跳转，即改变URL但不触发{@link Locator#.event:redirect|redirect事件}
     *
     * @member {boolean} [meta.RedirectOptions#.silent=false]
     */
    this.silent;

    /**
     * 强制跳转，即URL无变化时也重新加载
     *
     * @member {boolean} [meta.RedirectOptions#.force=flase]
     */
    this.force;

    /**
     * 后台跳转，即不将URL变化体现在浏览器上
     *
     * @member {boolean} [meta.RedirectOptions#.background=false]
     */
    this.background;
}
