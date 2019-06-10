<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Mail;

class BackupDatabase extends Command
{
    protected $signature = 'db:backup';

    protected $description = 'Backup the database';

    protected $process;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->process = new Process(sprintf(
            'mysqldump -u%s -p%s %s %s > %s',
            config('database.connections.mysql.username'),
            config('database.connections.mysql.password'),
            config('database.connections.mysql.database'),
            "--skip-extended-insert",
            storage_path('database/'.date('Y-m-d').'.sql')
        ));
    }

    public function handle()
    {
        try {
            $this->process->mustRun();
            // 要删除的文件
            $delete_file = storage_path('database/'.date('Y-m-d', strtotime('-7 days')).'.sql');
            // 如果有就删除历史文件
            if (file_exists($delete_file)) {
                unlink($delete_file);
            }
            $content = '数据库备份成功，请管理员到指定位置下载备份文件！';
            $toMail  = 'magicheart@163.com';
            Mail::raw($content, function ($message) use ($toMail) {
                $message->subject('【备份】数据库 - ' .date('Y-m-d H:i:s'));
                // $attachment = storage_path('database/'.date('Y-m-d').'.sql');
                // $message->attach($attachment,['as'=>date('Y-m-d').'.sql']);
                $message->to($toMail);
            });

            $this->info('The backup has been proceed successfully.');
        } catch (ProcessFailedException $exception) {
            $content = '数据库备份失败，请联系管理员！';
            $toMail  = 'magicheart@163.com';
            Mail::raw($content, function ($message) use ($toMail) {
                $message->subject('【备份】数据库 - ' .date('Y-m-d H:i:s'));
                $message->to($toMail);
            });
            $this->error('The backup process has been failed.');
        }
    }
}