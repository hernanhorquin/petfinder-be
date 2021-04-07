const verify = async (token) => {
  const clean = token.replace(/Bearer /g, '')
  const payload = jwt.verify(clean, settings.jwt.secret);
  return payload;
};

const secret = 'A2132#"!=¨}[843@_@1759';

module.exports = {
  verify
};
