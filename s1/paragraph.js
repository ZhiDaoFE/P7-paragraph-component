const Paragraph = ((document) => {
  const defaultCls = 'zd-paragraph';
  const expandBtnCls = 'zd-paragraph-expand';
  const expandBtnText = '展开';
  const collapseBtnText = '收起';
  const defaultRow = 2;
  return class extends BaseComWithDom {
    // _text;
    // _row;
    // _expandable;
    // _isExpand;
    // _suffix;

    constructor(props = {}) {
      super({...props, cls: props.cls ? `${props.cls} ${defaultCls}` : defaultCls});

      this._build();
    }

    init(props = {}) {
      const { text, row = defaultRow, expandable, suffix } = props;

      this._text = this.getRoot().innerText;
      this._row = row;
      this._expandable = expandable;
      this._isExpand = false;
      this._suffix = suffix;
      this.setText(text);
    }

    _build() {
      this._onClick = (event) => {
        if (event.target && event.target.classList.contains(expandBtnCls)) {
          if (!this._expandable) return;
          this._isExpand = !this._isExpand;
          this.resize();
        }
      }

      this.getRoot().addEventListener('click', this._onClick);
      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize);
    }

    setText(text) {
      text = String(text);

      if (text !== this._text) {
        this._text = text;
        this.resize();
      }

      return this;
    }

    getText() {
      return this._text;
    }
    
    setRow(row) {
      row = parseInt(row);

      if (row >= 1) {
        this._row = row;
        this.resize();
      }

      return this;
    }

    getRow() {
      return this._row;
    }

    setExpandable(expandable) {
      if (this._expandable !== !!expandable) {
        this._expandable = !!expandable;
        this.resize();
      }

      return this;
    }

    getExpandable() {
      return this._expandable;
    }

    setSuffix(suffix) {
      suffix = String(suffix);

      if (suffix !== this._suffix) {
        this._suffix = suffix;
        this.resize();
      }

      return this;
    }

    getSuffix() {
      return this._suffix;
    }

    _getInnerHtml(index) {
      return `${this._text.substring(0, index)}${index === this._text.length ? '' : '<span>...</span>'}${this._suffix || ''}${
        this._expandable ? `<button class="${expandBtnCls}">${this._isExpand ? collapseBtnText : expandBtnText}</button>` : ''
      }`;
    }

    resize() {
      const rootStyle = window.getComputedStyle(this.getRoot());
      const rowHeight = parseInt(rootStyle.lineHeight);
      const maxHeight = this._isExpand ? Number.MAX_VALUE : this._row * rowHeight;

      const measure = document.createElement('span');
      measure.style.font = rootStyle.font;
      measure.style.position = 'absolute';
      measure.style.left = `${parseInt(rootStyle.borderLeftWidth) + parseInt(rootStyle.paddingLeft)}px`;
      measure.style.right = `${parseInt(rootStyle.borderRightWidth) + parseInt(rootStyle.paddingRight)}px`;
      measure.style.visibility = 'hidden';
      this.getRoot().appendChild(measure);
      
      let height;
      let i = this._text.length;
      do {
        measure.innerHTML = this._getInnerHtml(i);
        height = measure.getBoundingClientRect().height
        i--;
        // console.log('>>>', i, height, maxHeight, this._row, this._text.length);
      } while (height > maxHeight)

      this.getRoot().innerHTML = this._getInnerHtml(i+1);

      return this;
    }

    destory() {
      this.getRoot().removeEventListener('click', this._onClick);
      window.removeEventListener('resize', this.resize);

      return this;
    }
  }
})(document);