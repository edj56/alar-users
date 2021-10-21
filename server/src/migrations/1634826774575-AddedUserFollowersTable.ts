import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddedUserFollowersTable1634826774575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_followers',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'following_id',
                        type: 'int',
                    },
                    {
                        name: 'follower_id',
                        type: 'int',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FK_users_followings_user_id',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['following_id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'FK_users_followers_user_id',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['follower_id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
