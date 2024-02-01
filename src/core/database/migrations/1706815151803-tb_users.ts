import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class TbUsers1706815151803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'chat_tb_user',
      new TableColumn({
        name: 'device_token',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('chat_tb_user', 'device_token');
  }
}
