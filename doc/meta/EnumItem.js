/**
 * 用于{@link Enum}中的每一项的数据结构
 *
 * @class meta.EnumItem
 */
function EnumItem() {
    /**
     * 当前项的数值
     *
     * @member {number} meta.EnumItem#.value
     */
    this.value;

    /**
     * 当前项的别名
     *
     * @member {string} meta.EnumItem#.alias
     */
    this.alias;

    /**
     * 当前项的文字表达
     *
     * @member {string} meta.EnumItem#.text
     */
    this.text;
}
