export default function() {
  const duration = 500;

  this.transition(
    this.use('toRight', { duration })
  );

  this.transition(
    this.toRoute('menu'),
    this.use('toLeft', { duration })
  );
}
