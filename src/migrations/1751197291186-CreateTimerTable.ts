import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTimerTable1751197291186 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'timers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'type',
                        type: 'text',
                    },
                    {
                        name: 'trigger_time',
                        type: 'timestamptz',
                    },
                    {
                        name: 'job_data',
                        type: 'jsonb',
                    },
                    {
                        name: 'status',
                        type: 'text',
                        default: `'active'`,
                    },
                    {
                        name: 'retry_count',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'retry_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('timers');
    }
}
