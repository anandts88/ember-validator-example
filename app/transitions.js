export default function() {
  const duration = 500;

  this.transition(
    this.use('toRight', { duration })
  );
}
