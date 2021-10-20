import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddedUsersTable1634667455752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '128',
                        isUnique: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '256',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '512',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '64',
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '64',
                    },
                    {
                        name: 'birth_date',
                        type: 'date',
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: ['m', 'f', 'o'],
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                        length: '16',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        length: '64',
                        isNullable: true,
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        length: '64',
                        isNullable: true,
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
