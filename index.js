const getPattern = (expression) => {
  return expression.toString()
    .replace(/^\//, '')
    .replace(new RegExp(`/${expression.flags}$`), '');
};

if (!RegExp.prototype.check) {
  Object.defineProperty(RegExp.prototype, 'check', {
    value: function (string) {
      const newPattern = new RegExp(getPattern(this), this.flags);
      if (this.sticky) {
        newPattern.lastIndex = this.lastIndex;
      }
      return newPattern.test(string);
    }
  });
}
