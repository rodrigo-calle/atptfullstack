import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileCreatedEvent } from '../events/fileCreated.event';
import { NotificationsService } from 'src/modules/notifications/notifications.service';
import { NotificationType } from 'src/modules/notifications/notifications.entity';
import { UsersService } from 'src/modules/users/users.service';
import { FilesService } from '../files.service';
import { getMedalAfterUpload } from 'src/utils/medals';
import { Medal } from 'src/common/types';
import { FileUpdatedEvent } from '../events/fileUpdated.event';

@Injectable()
export class FileCreatedListener {
  constructor(
    private notificationService: NotificationsService,
    private usersService: UsersService,
    private filesService: FilesService,
  ) {}
  @OnEvent('file.created')
  async handleFileCreatedEvent(event: FileCreatedEvent) {
    // Send notification to admins
    const user = await this.usersService.findOne({ id: event.userId });
    const clientsRegisteredInFile = await this.filesService.countCsvRecords(
      event.fileUrl,
    );

    this.notificationService.create({
      date: new Date(),
      message: `File uploaded ${event.fileUrl} by ${event.username} with ${clientsRegisteredInFile} new clients`,
      readedBy: null,
      sentBy: user,
      sentTo: null,
      type: NotificationType.INFO,
    });

    // Update medal of user
    const { medals, clientsRegistered } = user;

    const currentMedals = medals ? (JSON.parse(medals) as Medal[]) : [];
    const { newMedals, newClientsRegistered } = getMedalAfterUpload(
      currentMedals,
      clientsRegisteredInFile,
      clientsRegistered,
    );

    await this.usersService.update(user.id, {
      medals: JSON.stringify(newMedals),
      newClientsForRegister: newClientsRegistered,
    });
  }

  @OnEvent('file.updated.status.approved')
  async handleFileUpdatedStatusApprovedEvent(event: FileUpdatedEvent) {
    // Send notification to users
    const user = await this.usersService.findOne({ id: event.updatedBy });
    const eventUser = await this.usersService.findOne({
      id: event.user.id,
    });

    await this.notificationService.create({
      date: new Date(),
      message: `File ${event.fileId} updated to ${event.status} by ${user.username}`,
      readedBy: null,
      sentBy: user,
      sentTo: eventUser,
      type: NotificationType.INFO,
    });

    // Update medal of user
    const { medals, clientsRegistered } = event.user;

    const currentMedals = medals ? (JSON.parse(medals) as Medal[]) : [];

    const { newMedals, newClientsRegistered } = getMedalAfterUpload(
      currentMedals,
      event.totalClients,
      clientsRegistered,
    );

    const verifiedMedals = currentMedals.map((medal) => {
      return {
        ...medal,
        verified: true,
      };
    });
    const lastMedal = newMedals[verifiedMedals.length - 1].name;

    await this.usersService.update(event.user.id, {
      medals: JSON.stringify(verifiedMedals),
      lastMedal,
      clientsRegistered: clientsRegistered + newClientsRegistered,
    });
  }

  @OnEvent('file.updated.status.rejected')
  async handleFileUpdatedStatusRejectedEvent(event: FileUpdatedEvent) {
    const user = await this.usersService.findOne({ id: event.updatedBy });
    const eventUser = await this.usersService.findOne({
      id: event.user.id,
    });
    await this.notificationService.create({
      date: new Date(),
      message: `File ${event.fileId} updated to ${event.status} by ${user.username}`,
      readedBy: null,
      sentBy: user,
      sentTo: eventUser,
      type: NotificationType.WARNING,
    });
  }
}
