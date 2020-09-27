import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await this.userService.findAllUsers();
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        return this.userService.createUser(data);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        return this.userService.updateUser(data)
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Args('id') id: string
    ): Promise<boolean> {
        await this.userService.deleteUser(id);
        return true;
    }
}
